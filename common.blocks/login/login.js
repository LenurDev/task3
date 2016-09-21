/**
 * Created by lenur on 9/8/16.
 */

modules.define('login', ['i-bem__dom', 'jquery', 'events__channels'], function (provide, BEMDOM, $, channels) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        channels('lang').on('change', function(e, data) {
                            BEMDOM.update(this.domElem, data);
                        }, this);
                    }
                }
            }
        })
    )
});
//
// {
//     live: function() {
//
//         console.log('this', this._facebook);
//         var ptp = this.prototype;
//
//         // var facebook = this.findBlocksInside('facebook', 'button');
//         // console.log(facebook);
//         console.log('ptp', ptp._facebook);
//         this.liveBindTo('change', function () {
//             var lang = this.getVal();
//             //@todo loader
//             $.get('/lang/' + lang)
//                 .done(function () {
//                     console.log('text', i18n('login', 'please'));
//                     facebook.setText(i18n('login', 'facebook'));
//                     vk.setText(i18n('login', 'vk'));
//                 });
//         });
//     }
// })