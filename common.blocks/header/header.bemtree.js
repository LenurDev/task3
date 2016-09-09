block('header').content()(function () {
    var currentUser = this.data.currentUser,
        i18n        = this.i18n;
    return [
        {
            block: 'layout',
            content: [
                {
                    elem: 'left',
                    content: {
                        block: 'link',
                        url: '/',
                        content: {
                            block: 'image',
                            url: '/img/pepo.png'
                        }
                    }
                },
                {
                    elem: 'right',
                    content: [
                        {
                        tag: 'form',
                        attrs: {action: '/search'},
                        content: [
                            {
                                block: 'input',
                                name: 'text',
                                placeholder: i18n('header', 'phSearch')
                            },
                            {
                                block: 'search-icon',
                                tag: 'button',
                                mods: {type: 'submit'},
                                type: 'submit'

                            }
                        ]
                        }
                    ]

                }
            ]
        },
        {
            block: 'header-menu',
            tag: 'ul'
        },
        {
            block: 'header-hamburger-menu',
            currentUser: currentUser
        },
        {
            block: 'header-notification',
            js: true
        }
    ];
});
