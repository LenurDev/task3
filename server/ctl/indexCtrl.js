/**
 * Created by admin on 18.09.16.
 */

module.exports = function () {
    const render = require('../render').render;

    return {
        lang: function(req, res, next) {
            console.log('R', req.params.lang);
            req.session.lang = req.params.lang;
            //        res.redirect('/login');
            render(req,res, {
                view:'login',
                title: 'login'
            });
        },

        login: function(req, res){
            render(req, res, {
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
