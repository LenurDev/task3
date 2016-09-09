block('addSeed').content()(function () {
    var i18n = this.i18n;
    return {
        content: [
            {
                block: 'textarea',
                mods: {theme: 'islands', size: 'm', width: 'available'},
                name: 'text',
                attrs: {
                    maxlength: 140,
                    required: true
                },
                placeholder: i18n('addSeed', 'text')
            },
            this.ctx.replyTo ? {
                block: 'input',
                name: 'parent',
                mods: {type: 'hidden'},
                val: this.ctx.replyTo
            } : '',
            {
                block: 'button',
                mods: {theme: 'islands', size: 'l', type: 'submit'},
                type: 'submit',
                text: i18n('addSeed', 'button')
            },
            {
                block: 'attach',
                name: 'image',
                id: 'attachImage',
                accept: 'image/gif,image/jpeg,image/jpg,image/png',
                mods: { theme: 'islands', size: 'l', preview: 'image'},
                button: {
                    block: 'button',
                    icon: {
                        block: 'icon',
                        url: '/img/icon-camera.svg'
                    },
                    text:i18n('addSeed', 'photo')
                }
            }
        ]
    }
});
