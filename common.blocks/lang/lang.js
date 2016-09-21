/**
 * Created by admin on 04.09.16.
 */

modules.define('lang', ['i-bem__dom', 'jquery', 'events__channels'], function (provide, BEMDOM, $, channels) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        var select = this.findBlockInside('select');

                        select.on('change', function() {
                            var lang = this.getVal();
                            $.get('/lang/'+ lang)
                                .done(function (data) {
                                    channels('lang').emit('change', data);
                                });
                        });
                    }
                }
            }
        })
    )
});