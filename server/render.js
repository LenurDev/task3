var path = require('path'),
    config = require('./config'),
    langs = config.langs,
    bundleName = 'index',
    pathToBundle = path.resolve('desktop.bundles', bundleName),
    BEMTREE = langs.reduce(function(tmpls, lang) {
        tmpls[lang] = require(path.join(pathToBundle, bundleName + '.bemtree.' + lang + '.js')).BEMTREE;
        return tmpls;
    }, {}),
    // BEMTREE = require(path.join(pathToBundle, bundleName + '.bemtree.js')).BEMTREE,
    BEMHTML = require(path.join(pathToBundle, bundleName + '.bemhtml.js')).BEMHTML,

    isDev = process.env.NODE_ENV === 'development',
    useCache = !isDev,
    cacheTTL = config.cacheTTL,
    cache = {};

function render(req, res, data, context) {
    useCache = false;
    if(data.profileSettings){
        dropCache();
    }

    var query = req.query,
        user = req.user,
        lang = req.session.lang || 'ru',
        cacheKey = req.url + req.lang + (context ? JSON.stringify(context) : '') + (user ? JSON.stringify(user) : ''),
        cached = cache[cacheKey];

console.log('LANG in Session', req.session.lang);
console.log('LANG', lang);
    if (useCache && cached && (new Date() - cached.timestamp < cacheTTL)) {
        return res.send(cached.html);
    }

    if (isDev && query.json) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');

    var bemtreeCtx = {
        block: 'root',
        context: context,
        // extend with data needed for all routes
        data: Object.assign({}, {
            url: req._parsedUrl
        }, data)
    };

    try {
        var bemjson = BEMTREE[lang].apply(bemtreeCtx);
    } catch(err) {
        console.error('BEMTREE error', err.stack);
        console.trace('server stack');
        return res.sendStatus(500);
    }

    if (isDev && query.bemjson) return res.send('<pre>' + JSON.stringify(bemjson, null, 4) + '</pre>');

    try {
        var html = BEMHTML.apply(bemjson);
    } catch(err) {
        console.error('BEMHTML error', err.stack);
        return res.sendStatus(500);
    }

    useCache && (cache[cacheKey] = {
        timestamp: new Date(),
        html: html
    });

    res.send(html);
}

function renderCustomHtml(req, res, data) {

    var lang = req.session.lang || 'ru';

    try {
        var bemjson = BEMTREE[lang].apply(data);
    } catch(err) {
        return res.sendStatus(500);
    }

    try {
        var html = BEMHTML.apply(bemjson);
    } catch(err) {
        return res.sendStatus(500);
    }

    res.send(html);

}

function ren(req, res, bemjson) {
    var html = BEMHTML.apply(bemjson);
    res.send(html);
}

function dropCache() {
    cache = {};
}

module.exports = {
    render: render,
    renderCustomHtml: renderCustomHtml,
    dropCache: dropCache
};
