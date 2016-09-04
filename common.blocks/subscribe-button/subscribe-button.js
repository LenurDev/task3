modules.define('subscribe-button', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                'inited': function () {
                    var subscribeButton = this.findBlockInside('subscribe', 'button');
                    var self = this;
                    this.bindTo('subscribe', 'click', function (e) {
                        e.preventDefault();
                        $.get('/profile/'+this.params.userNick+'/subscribe', this.params)
                            .done(function (data) {
                                switch (data) {
                                    case true:
                                        subscribeButton.setText('Отписаться');
                                        self.emit('subscribe');
                                        break;
                                    case false:
                                        subscribeButton.setText('Подписаться');
                                        self.emit('unSubscribe');
                                        break;
                                    default:
                                        console.log(data);
                                        break;
                                }
                            });
                    });
                    this.bindTo('edit-profile', 'click', function (e) {
                        e.preventDefault();
                        window.location.href='/profile/my';
                    });
                }
            }
        }
    }));
});
