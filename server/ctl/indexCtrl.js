/**
 * Created by admin on 18.09.16.
 */

module.exports = function () {
    const render = require('../render');

    return {
        lang: function(req, res, next) {
            req.session.lang = req.params.lang;
            render.renderCustomHtml(req,res, {
                block:'login'
            });
        },

        login: function(req, res){
            render.render(req, res, {
                view:'login',
                title: 'login'
            });
        },

        logout: function(req, res){
            req.logout();
            req.session.lang = null;
            res.redirect('/');
        }

    }
};
