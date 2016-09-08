/**
 * Created by admin on 04.09.16.
 */

modules.define('lang', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        var select = this.findBlockInside('select');
                        select.on('change', function() {
                            var lang = this.getVal();
                            //@todo loader
                            $.get('/lang/'+ lang)
                                .done(function (data) {

                                });
                        });
                    }
                }
            }
        })
    )
});