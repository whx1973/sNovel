
var mysql = require('mysql'),
	fs = require('fs'), 
	iconv = require('iconv-lite'),
	dbname = 'novel',
	pool = mysql.createPool({
		connectionLimit : 10,
		host : 'localhost',
		user : 'root',
		password : 'mysql',
		database : 'snovel'
	});
function query(sql,callback){  
	pool.getConnection(function(err,connection){ 
		connection.query(sql,function(err,rows){
			if(err) throw err; 
			callback(rows);
			connection.release(); 
		})
	}); 
}
function chapterTxtpath(articleid,chapterid){
	var  n = Math.floor(articleid / 1000);
	return '../'+n+'/'+articleid+'/'+chapterid+'.txt';
}
function imgUrl(id){
	var  n = Math.floor(id / 1000);
	return 'files/article/image/'+n+'/'+id+'/'+id+'s.jpg';
}
 
 

exports.detail = function (req, res){
	var articleid = req.param('bookid'),
   	    chapterid = req.param('chapterid'),
   	    resdata = {error:'request param error',result:{}};
   	if(!(articleid>0&&chapterid>0)) res.send(data);
   	var path = chapterTxtpath(articleid,chapterid);

   	query(` SELECT chaptername,chapterid,articleid,nextChapter,prevChapter FROM (SELECT chaptername,chapterid,articleid FROM jieqi_article_chapter WHERE articleid = ${articleid}  and chaptertype=0 and chapterid = ${chapterid}) t,
(SELECT MIN( chapterid ) as nextChapter 
FROM jieqi_article_chapter
WHERE articleid = ${articleid}
AND chapterid > ${chapterid}
AND chaptertype =0  ) t1,

(SELECT MAX( chapterid ) as prevChapter 
FROM jieqi_article_chapter
WHERE articleid = ${articleid}
AND chapterid < ${chapterid}
AND chaptertype =0) t2 `,function(chapters){
   		var obj = {}; 

   		obj.nextChapter = chapters[0] && chapters[0].nextChapter ||'';
   		 
   		obj.chaptername = chapters[0] && chapters[0].chaptername;
   		obj.bookId = articleid;
   		obj.currentChapterId = chapterid;
   		obj.prevChapter =  chapters[0] && chapters[0].prevChapter ||'';
   		fs.readFile(path,function(err,data){
	   		if(err) res.send(data);
	   		if(!data) {
	   			res.send(data);
	   			return;
	   		}
	   		var str = iconv.decode(data, 'gbk');  
	   		str = "<p>"+str.replace(/\s{8}/g,"</p><p>")+"</p>";
	   		obj.detail = str;
	   	 	resdata.error = '';
	   		resdata.result = obj;
	   		res.send(resdata);
	   	})
   	})
   	
}



exports.list = function(req, res){
	var articleid = req.param('bookid'), 
   	    pageid = req.param('pageid'),
   	    pagesize = req.param('pagesize'),
   	    orderstr = req.param('order')==0?'asc':'desc',
   	    data = {error:'request param error',data:[]};  
   	if(!(articleid>0&&pageid>0&&pagesize>0)) res.send(data);
   	query("SELECT count(1) as count FROM jieqi_article_chapter WHERE  articleid = "+ articleid,function(chapterCountRow){

   		query("SELECT chapterid,articleid,articlename,FROM_UNIXTIME(lastupdate) as lastupdate,chaptername,chapterorder,chaptertype FROM jieqi_article_chapter WHERE  articleid = "+ articleid+ " order by chapterorder " + orderstr + " limit  " + (pageid - 1) * pagesize+ " , " + pagesize,function(value){
 
			data.error='';
			data.pageSize = pagesize;
			data.pageIndex = pageid;
			data.count = chapterCountRow[0].count;
			data.data = value;
			res.send(data);
		});  
   	});
   	
}

exports.allList = function(req, res){
	var articleid = req.param('bookid'),  
   	    orderstr = req.param('order')==0?'asc':'desc',
   	    data = {error:'request param error',data:[]};  
   	if(!(articleid>0)) res.send(data);

   	query("SELECT chapterid,articleid,articlename,FROM_UNIXTIME(lastupdate) as lastupdate,chaptername,chapterorder,chaptertype FROM jieqi_article_chapter WHERE  articleid = "+ articleid+ " order by chapterorder " + orderstr,function(value){
 
		data.error='';
		data.data = value;
		var html = "<li class=\"grad_01\">第1章　神奇小册子<\/li>"
		 
		// res.send(value.map(function(item){return "<li class=\"grad_01\">"+item.chaptername+"<\/li>" }).join(''))
		res.send(value);
	}); 
}

exports.prev = function(req, res){
	var articleid = req.param('bookid'),
   	    chapterid = req.param('chapterid'),
   	    data = {error:'request param error',result:{}};
   	if(!(articleid>0&&chapterid>0)) res.send(data);
   	query("SELECT chapterid FROM jieqi_article_chapter WHERE chaptertype=0 and  articleid = "+ articleid+ " and chapterid < "+chapterid +" ORDER BY chapterid DESC LIMIT 0,1",function(value){
   		 
   		chapterid =value[0] && value[0].chapterid;
   		if(!chapterid) res.send(data);
   		var path = chapterTxtpath(articleid,chapterid);
	   	fs.readFile(path,function(err,data){
	   		if(err) res.send(data);
	   		if(!data) {
	   			res.send(data);
	   			return;
	   		}
	   		var str = iconv.decode(data, 'gbk');  
	   		str = "<p>"+str.replace(/\s{8}/g,"</p><p>")+"</p>";
	   		res.send(str);
	   	})
   	})
}

exports.next = function(req, res){
	var articleid = req.param('bookid'),
   	    chapterid = req.param('chapterid'),
   	    data = {error:'request param error',result:{}};
   	if(!(articleid>0&&chapterid>0)) res.send(data);
   	query("SELECT chapterid FROM jieqi_article_chapter WHERE chaptertype=0 and  articleid = "+ articleid+ " and chapterid > "+chapterid +" ORDER BY chapterid ASC LIMIT 0,1",function(value){
   		 
   		chapterid =value[0] && value[0].chapterid;
   		if(!chapterid) res.send(data);
   		var path = chapterTxtpath(articleid,chapterid);
	   	fs.readFile(path,function(err,data){
	   		if(err) res.send(data);
	   		if(!data) {
	   			res.send(data);
	   			return;
	   		}
	   		var str = iconv.decode(data, 'gbk');  
	   		str = "<p>"+str.replace(/\s{8}/g,"</p><p>")+"</p>";
	   		res.send(str);
	   	})
   	})
}

exports.sort = function (req, res){

}

