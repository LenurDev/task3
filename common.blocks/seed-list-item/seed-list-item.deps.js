/**
 * Created by Yulia on 26.08.16.
 */


({
    mustDeps: 'i18n',
    shouldDeps: [
        'followed-unfollowed', 'profile',
        {
            block: 'popup',
            mods: {
                theme: 'islands',
                target: 'anchor',
                autoclosable: true
            }
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                type: 'link',
                view: 'action'
            }
        }
        //{
        //    block: 'map',
        //    mods: 'ymaps'
        //}
    ]
})
