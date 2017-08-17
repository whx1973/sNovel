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

exports.detail = function(req, res) {
    var articleid = req.param('bookid'),
        chapterid = req.param('chapterid'),
        data = { error: 'request param error', result: {} };
    if (!(articleid > 0 && chapterid > 0)) res.send(data);
    var path = chapterTxtpath(articleid, chapterid);
    var tasks = {
        getContent: function(callback) {
            fs.readFile(path, function(err, data) {
                var str = iconv.decode(data, 'gbk');
                str = "<p>" + str.replace(/\s{8}/g, "</p><p>") + "</p>";
                callback(err, str);
            })
        },
        getChapterDetail: function(callback) {
            query(`SELECT chaptername,articleid from jieqi_article_chapter where chapterid = ${chapterid}`, callback);
        },
        getNextChapter: function(callback) {
            query(`SELECT MIN(chapterid) as nextChapter from jieqi_article_chapter WHERE articleid = ${articleid} AND chapterid > ${chapterid} AND chaptertype =0 `, callback);
        },
        getPrevChapter: function(callback) {
            query(`SELECT MAX(chapterid) as prevChapter from jieqi_article_chapter WHERE articleid = ${articleid} AND chapterid < ${chapterid} AND chaptertype =0 `, callback);
        }
    }
    async.series(tasks, function(err, results) {
        if (err) {
            console.log(err);
            data.error = err;
            res.send(data);
        } else {
            var obj = {};
            obj.nextChapter = results['getNextChapter'][0].nextChapter;
            obj.prevChapter = results['getPrevChapter'][0].prevChapter;
            obj.bookId = articleid;
            obj.currentChapterId = chapterid;
            obj.chaptername = results['getChapterDetail'][0].chaptername;
            obj.detail = results['getContent'];
            data.error = "";
            data.result = obj;
            res.send(data);
        }
    });
} 
exports.list = function(req, res) {
    var articleid = req.param('bookid'),
        pageid = req.param('pageid'),
        pagesize = req.param('pagesize'),
        orderstr = req.param('order') == 0 ? 'asc' : 'desc',
        data = { error: 'request param error', data: [] };
    if (!(articleid > 0 && pageid > 0 && pagesize > 0)) res.send(data);
    var tasks = {
        getCount: function(callback) {
            query(`SELECT count(1) as count FROM jieqi_article_chapter WHERE  articleid = ${articleid}`, callback);
        },
        getList: function(callback) {
            query(`SELECT chapterid,articleid,articlename,FROM_UNIXTIME(lastupdate) as lastupdate,chaptername,chapterorder,chaptertype FROM jieqi_article_chapter WHERE  articleid = ${articleid} order by chapterorder ${orderstr} limit ${(pageid-1)*10} , ${pagesize} `, callback);
        }
    }
    async.series(tasks, function(err, results) {
        if (err) {
            console.log(err);
            data.error = err;
            res.send(data);
        } else {
            data.error = '';
            data.pageSize = pagesize;
            data.pageIndex = pageid;
            data.count = results['getCount'][0].count,
            data.data = results['getList'];
            res.send(data);
        }
    });  
}

 

exports.sort = function(req, res) {

}