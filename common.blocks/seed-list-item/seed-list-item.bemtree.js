/**
 * Created by Yulia on 22.08.16.
 */

/**
 * Created by admin on 04.09.16.
 */

block('seed-list-item').content()(function () {
    var seed = this.ctx.seed,
        i18n = this.i18n,
        moment = this.require('moment');
        moment.locale(i18n('root', 'lang'));

    var msg = seed.msg;

    var cont = [];
    if (typeof seed.links !== 'undefined') {
        seed.links.title ? cont.push(
            {
                elem: 'title',
                tag: 'h3',
                content: seed.links.title
            }): '';

        seed.links.image ? cont.push(
            {
                block: 'image',
                url: seed.links.image,
                alt: 'link Image'
            }) : '';
    }

    var profile = msg.match(/@[a-z0-9_-]+/ig);
    var links = msg.match(/(https?:\/\/[^\s]+)/g);
    msg = msg.replace(/(https?:\/\/[^\s]+)/g, '');

    return [
        {
            elem: 'item',
            content: [
                {
                    block: 'profile',
                    profile: seed.profile
                },
                {
                    elem: 'message',
                    // mix: {block: 'seed-list-item', elem: 'seed-link'},
                    // url: '/seed/view/' + seed.id,
                    content: [
                        {
                            block: 'link',
                            url: '/seed/view/' + seed.id,
                            content: {
                                elem: 'date',
                                //mix: {block: 'seed-list-item', elem: 'date'},
                                content: moment(seed.datetime).fromNow()
                            }
                        },
                        cont.length > 0 ?
                        {
                            elem: 'snippet',
                            content: cont
                        } : '',
                        {
                            elem: 'msg',
                            content: msg
                        },
                        seed.img ?
                        {
                            block: 'image',
                            url: seed.img,
                            alt: 'Seed Image',
                            height: 'auto'
                        } : '',

                        links.length > 0 ?
                            links.map(function(link){
                            return {
                                block: 'link',
                                url: link,
                                content: {
                                    elem: 'control',
                                    content: link
                                }
                            }
                        }) : '',

                        profile ?
                        {
                            block: 'link',
                            url: '/profile/' + profile,
                            content: {
                                elem: 'control',
                                content: profile
                            }
                        } : ''
                        //
                        ////maps
                        //{
                        //    block: 'map',
                        //    js: true,
                        //    mods: {api: 'ymaps'}
                        //}

                    ]

                },
                {
                    elem: 'bottom',
                    content: [
                        {
                            block: 'button',
                            mods: {theme: 'islands', size: 'm', view: 'action', type: 'link'},
                            mix: {block: 'seed-list-item', elem: 'answer'},
                            url: '/seed/add/?id=' + seed.id,
                            text: i18n('seedListItem', 'reply')
                        },
                        seed.parent ? {
                            elem: 'reply',
                            content: i18n('seedListItem', 'isAnswer')
                        } : ''
                    ]
                }
            ]
        }
    ];
});
