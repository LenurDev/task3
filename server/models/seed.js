var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var metascraper = require('metascraper');
var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

var schema =  new Schema({
    msg: String,
    tags: [],
    mention: [],
    datetime: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: Schema.Types.ObjectId, ref: 'Seed'
    },
    root: {type: Schema.Types.ObjectId, ref: 'Seed'},
    child:[{type: Schema.Types.ObjectId, ref: 'Seed'}],
    //allChild:[{type: Schema.Types.ObjectId, ref: 'Seed'}],
    author: {
        type: Schema.Types.ObjectId, // id коллекции User
        required: true
    },
    image: String, // URL
    latlng: String,
    links: {
        url: String,
        title: String,
        image: String,
        description: String
    },
    link: Schema.Types.ObjectId // id в кэше сниппетов ссылок
});

schema.statics.getCountPlain = function (user, opts, callback) {
  var seed = this;
  var fromtime = opts.fromtime || false;
  var newest = opts.newest || false;
  var author = opts.author || false;
  var agregators = [
      {
          $match: fromtime ? {
              datetime: {$lt: fromtime}
          } : {}
      },{
          $match: newest ? {
              datetime: {$gt: newest}
          } : {}
      },
      {
          $match: author && (author.length > 0) ? (
              author instanceof Array && author.length > 0 ? {
                  $or: author.map(function (item) {
                      return {author: new ObjectId(item)};
                  })
              } : {
                  author: new ObjectId(author)
              }
          ) : {
              author: null
          }
      }
  ];

  seed.aggregate(agregators, function(err, seeds) {
      if (err) return callback(err);
      callback(null, seeds.length);
  });
};

schema.statics.getPlain = function (user, opts, callback) {
    var seed = this;
    var fromtime = opts.fromtime || false;
    var newest = opts.newest || false;
    var author = opts.author || false;
    var search = opts.search || false;
    var tag = opts.tag || false;
    var agregators = [
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id", as: "user"
            }
        }, {
            $sort: {
                datetime: -1
            }
        },
        {
            $match: fromtime ? {
                datetime: {$lt: fromtime}
            } : {}
        },{
            $match: newest ? {
                datetime: {$gt: newest}
            } : {}
        },
        {
            $match: author && (author.length > 0) ? (
                author instanceof Array && author.length > 0 ? {
                    $or: author.map(function (item) {
                        return {author: new ObjectId(item)};
                    })
                } : {
                    author: new ObjectId(author)
                }
            ) : {}
        },
        {
            $match: search ? {
                msg: new RegExp(search)
            } : {}
        },
        {
            $match: tag ? {
                tags: tag
            } : {}
        },
        {
            $limit: 10
        }
    ];

    agregators.push();
    seed.aggregate(agregators, function(err, seeds) {
        if (err) return callback(err);

//console.log('seeds', seeds);

        var seedsPlain = seeds.map(function (seed) {
            return {
                id: seed._id,
                msg: seed.msg,
                links: seed.links,
                datetime: seed.datetime,
                parent: seed.parent, //Твит на который сделали ответ,
                profile: seed.user[0],
                img: seed.image,
                tags: seed.tags,
                mention: seed.mention,
                followed: 1
            };
        });
        callback(null, seedsPlain);
    });
};

schema.statics.getSeed = function (seedId, callback) {
    var seed = this;
    var agregators = [
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id", as: "user"
            }
        },
        {
            $match: { _id: mongoose.Types.ObjectId(seedId) }
        }
    ];

    seed.aggregate(agregators, function(err, seeds) {
        if (err) return callback(err);
        var seed = seeds[0] || null;
        var result = {
                id: seed._id,
                msg: seed.msg,
                datetime: seed.datetime,
                parent: seed.parent, //Твит на который сделали ответ
                child: seed.child,
                profile: seed.user[0],
                img: seed.image,
                followed: 1
            };
        callback(null, result);
    });
};


schema.post('save', function(doc) {
    if (doc.parent) {
        this.model('Seed').findByIdAndUpdate(doc.parent, {$push: {child: doc._id }}, function (err, doc){
            if (err) console.log(err);
        });
    }
});

schema.pre('save', function(next) {
    if (this.msg) {
        var tags = this.msg.match(/#.+?(\s|$)/g);
        if (tags) {
            this.tags = tags.map(function(tag){
                return tag.trim().substr(1);
            });
        }

        var nicks = this.msg.match(/@[a-z0-9_-]+/ig);
        if (nicks) {
            this.mention = nicks.map(function(nick){
                return nick.trim().substr(1);
            });
        }

        var match = this.msg.match(pattern);
        if (!match) {
            return next();
        }

        var url = match[0];
        var self = this;
        metascraper.scrapeUrl(url)
            .then(function(data) {
                self.links = data;
                next();
            })
            .catch(function() {
                next();
            });

    } else {
        next();
    }
});

module.exports = mongoose.model('Seed', schema);
