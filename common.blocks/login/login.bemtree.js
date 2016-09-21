block('login').content()(function () {
    var i18n = this.i18n;

    return [
        {
            elem: 'center',
            content: {
                block: 'link',
                url: '/',
                content:{
                    block: 'image',
                    url: '/img/pepo.png',
                    width: '120px'
                }
            }
        },
        {
            elem: 'please',
            content: i18n('login', 'please')
        },
        {
            elem: 'facebook',
            content: {
                block: 'button',
                mods: {theme: 'fvbutton', type: 'link'},
                url: '/login/facebook',
                text: i18n('login', 'facebook'),
                icon: {
                    block: 'icon',
                    mods: {
                        social: 'facebook'
                    }
                }
            }
        },
        {
            elem: 'vkontakte',
            content: {
                block: 'button',
                mods: {theme: 'fvbutton', type: 'link'},
                url: '/login/vkontakte',
                text: i18n('login', 'vk'),
                icon: {
                    block: 'icon',
                    mods: {
                        social: 'vk'
                    }
                }
            }
        }
    ]
});
