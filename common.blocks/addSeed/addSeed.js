/**
 * Created by lenur on 9/16/16.
 */

modules.define('addSeed', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js' : {
                'inited' : function() {
                    console.log(this.domElem[0].outerHTML);

                    var location = [];

                    // if ("geolocation" in navigator) {
                    //     navigator.geolocation.getCurrentPosition(function(position) {
                    //         location.push(position.coords.latitude);
                    //         location.push(position.coords.longitude);
                    //     });
                    //     /* геолокация доступна */
                    // } else {
                    //     console.log('no');
                    //     /* геолокация НЕдоступна */
                    // }

                }
            }
        }
    }));

});