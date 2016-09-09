/**
 * Created by yulia on 18.08.16.
 */

block('header-menu').content()(function() {

    var isAuthenticated = this.data.isAuthenticated,
        i18n            = this.i18n;

    return [
        isAuthenticated ?
            {
                elem: 'item',
                tag: 'li',
                content: {
                    elem: 'link',
                    tag: 'a',
                    attrs: { href: '/seed/add' },
                    content: i18n('headerMenu', 'create')
                }
            } : ''
    ];
});
