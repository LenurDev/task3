/**
 * Created by admin on 20.08.16.
 */


block('lang')(
    js()(true),
    tag()('form'),
    attrs()(function() {
        return {
            action: 'l',
            method: 'POST'
        };
    }),
    mix()({block: 'clearfix'})
);
