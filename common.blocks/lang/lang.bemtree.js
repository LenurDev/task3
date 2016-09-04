/**
 * Created by admin on 04.09.16.
 */

block('lang').content()(function() {
    return {
        content: [
            {
                block : 'select',
                mods : { mode : 'radio', theme : 'islands', size : 'm', focused : true },
                name : 'lang',
                val : 'english',
                text : 'language',
                options : [
                    { val : 'en', text : 'English' },
                    { val : 'ru', text : 'Русский' }
                ]
            }
        ]

    }
});