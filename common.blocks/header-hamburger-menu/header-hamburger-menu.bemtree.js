block('header-hamburger-menu').content()(function () {
    var currentUser = this.ctx.currentUser || false,
        i18n        = this.i18n;
    return [
        {
            elem: 'checkbox',
            tag: 'input',
            attrs: {
                type: 'checkbox',
                id: 'hamburger'
            }
        },
        {
            elem: 'label',
            tag: 'label',
            attrs: {
                for: 'hamburger'
            }
        },
        {
            block: 'dropdown-menu',
            tag: 'ul',
            content: [
                currentUser.nick ? [
                        {
                        elem: 'item',
                        tag: 'li',
                        content: {
                            elem: 'link',
                            tag: 'a',
                            attrs: {href: '/profile/'+currentUser.nick},
                            content: i18n('hhm', 'profile')
                        }
                    },
                    {
                        elem: 'item',
                        tag: 'li',
                        content: {
                            elem: 'link',
                            tag: 'a',
                            attrs: {href: '/profile/'+currentUser.nick+'/follow'},
                            content: i18n('hhm', 'subscription')
                        }
                    },
                    {
                        elem: 'item',
                        tag: 'li',
                        content: {
                            elem: 'link',
                            tag: 'a',
                            attrs: {href: '/profile/'+currentUser.nick+'/subscribers'},
                            content: i18n('hhm', 'followers')
                        }
                    }
                ] : '',
                {
                    elem: 'item',
                    tag: 'li',
                    content: {
                        elem: 'link',
                        tag: 'a',
                        attrs: { href: '/profile/my' },
                        content: i18n('hhm', 'settings')
                    }
                },
                {
                    elem: 'item',
                    tag: 'li',
                    content: {
                        elem: 'link',
                        tag: 'a',
                        attrs: { href: '/logout' },
                        content: i18n('hhm', 'exit')
                    }
                }
            ]
        }
    ];
});
