/**
 * Created by admin on 04.09.16.
 */

modules.define('lang', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        console.log('this.name', this.name);
                     /*   this.bindTo(this.name, 'click', function (e) {
                            console.log('click');
                            e.preventDefault();
                            // $.get('/profile/'+this.params.userNick+'/subscribe', this.params)
                            //     .done(function (data) {
                            //         switch (data) {
                            //             case true:
                            //                 subscribeButton.setText('Отписаться');
                            //                 self.emit('subscribe');
                            //                 break;
                            //             case false:
                            //                 subscribeButton.setText('Подписаться');
                            //                 self.emit('unSubscribe');
                            //                 break;
                            //             default:
                            //                 console.log(data);
                            //                 break;
                            //         }
                            //     });
                        });
                        */
                    }
                }
            }
        })
    )
});