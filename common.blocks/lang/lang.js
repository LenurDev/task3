/**
 * Created by admin on 04.09.16.
 */

modules.define('lang', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        console.log('this.name', this.findElemInstances('lang', 'button'));
                        console.log('this.name', this.name);
                        //this.findElemInstances('select');
                    }
                }
            }
        })
    )
});