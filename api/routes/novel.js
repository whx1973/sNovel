var mysql = require('mysql'),
    async = require('async'),
    fs = require('fs'),
    iconv = require('iconv-lite'),
    dbname = 'novel',
    pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'snovel'
    });

function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, rows) {
            if (err) throw err;
            callback(err, rows);
            connection.release();
        })
    });
}

function chapterTxtpath(articleid, chapterid) {
    var n = Math.floor(articleid / 1000);
    return '../' + n + '/' + articleid + '/' + chapterid + '.txt';
}

function imgUrl(id) {
    var n = Math.floor(id / 1000);
    return 'files/article/image/' + n + '/' + id + '/' + id + 's.jpg';
}

function GetBookModule(sql, res) {
    var data = { error: 'request param error', data: [] };

    var tasks = {
        getBook: function(callback) {
            query(sql, callback)
        }
    };
    async.series(tasks, function(err, results) {
        if (err) {
            console.log(err);
            data.error = err;
            res.send(data);
        } else {
            data.error = '';
            var list = results['getBook'];

            list.map(function(item) {
                if (item.imgflag == 0) {
                    item.imgUrl = ''
                } else {
                    item.imgUrl = imgUrl(item.articleid);
                }
                return item;
            })
            data.data = list;
            res.send(data);
        }
    });
}
exports.bookModule = function(req, res) {
    var count = req.param('count')
    var moduleName = req.param('moduleName')
    var data = { error: 'request param error', data: [] };
    switch (moduleName) {
        case 'xstj':
            GetBookModule("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article limit  0, " + count, res)

            break;
        case 'wbjx':

            GetBookModule("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article limit  10, " + count, res)

            break;
        case 'zjgx':
            GetBookModule("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article where NOW() <=  DATE_ADD(FROM_UNIXTIME(lastupdate),INTERVAL 100 DAY)   order by lastupdate desc limit  0, " + count, res)

            break;

        default:
            break;
    }
}
exports.list = function(req, res) {
    var sortid = req.param('sortid'),
        pageid = req.param('pageid'),
        pagesize = req.param('pagesize') || 10;
    var data = { error: 'request param error', pagesize: pagesize, pageid: pageid, data: [], count: 0 };
    if (!(sortid > 0 && pageid > 0 && pagesize > 0)) res.send(data);
    var where = ' WHERE sortid = ' + sortid;
    var tasks = {
        getCategoryName: function(callback) {
            query("select name from jieqi_article_category where cid = " + sortid + "", callback)
        },
        getList: function(callback) {
            query("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article " + where + " limit  " + (pageid - 1) * pagesize + " , " + pagesize, callback)
        }
    };

    async.series(tasks, function(err, results) {
        if (err) {
            console.log(err);
            data.error = err;
            res.send(data);
        } else {
            data.error = '';
            var list = results['getList'];

            list.map(function(item) {
                if (item.imgflag == 0) {
                    item.imgUrl = ''
                } else {
                    item.imgUrl = imgUrl(item.articleid);
                }
                return item;
            })
            data.data = list;
            data.categoryName = results['getCategoryName'][0].name;

            res.send(data);
        }
    });

}
exports.book = function(req, res) {
    var data = { error: 'request param error', result: {} };
    var articleid = req.param('bookid');
    if (!(articleid > 0)) res.send(data);
    var tasks = {
        getBook: function(callback) {
            query("SELECT articlename,author,sortid,fullflag,imgflag,FROM_UNIXTIME(postdate) as postdate,FROM_UNIXTIME(lastupdate) as lastupdate,lastchapter,lastchapterid,intro,chapters FROM jieqi_article_article WHERE  articleid = " + articleid, callback)
        }
    }
    async.series(tasks, function(err, results) {
        if (err) {
            console.log(err);
            data.error = err;
            res.send(data)
        } else {
            data.error = '';
            var book = results['getBook'][0];
            if (book.imgflag == 0) {
                book.imgUrl = '';
            } else {
                book.imgUrl = imgUrl(articleid);
            }
            book.intro = book.intro.replace(/<\/p>/g, '');
            data.result = book;
            data.error = '';
            res.send(data);
        }
    });

}
exports.categoryList = function(req, res) {
    var tasks = {
        getCategoryList: function(callback) {
            query("select cid,pid,name from jieqi_article_category where display=1 order by cid asc", callback)
        }
    }
    async.series(tasks, function(err, results) {
        if (err) {
            console.log(err);
            res.send(error)
        } else {
            res.send(results['getCategoryList'])
        }
    });
}