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
//var sleep = require('sleep');
function query(sql,callback){   
	pool.getConnection(function(err,connection){ 

		connection.query(sql,function(err,rows){
			if(err) throw err; 
			callback(rows);
			connection.release(); 
		})
	});
	//return result;
}
function chapterTxtpath(articleid,chapterid){
	var  n = Math.floor(articleid / 1000);
	return '../'+n+'/'+articleid+'/'+chapterid+'.txt';
}
function imgUrl(id){
	var  n = Math.floor(id / 1000);
	return 'files/article/image/'+n+'/'+id+'/'+id+'s.jpg';
}
exports.bookModule = function(req, res){
	var count = req.param('count') 
	var moduleName = req.param('moduleName')

	var data = {error:'request param error',data:[]};
	var cb = function(result){
		data.error = ''; 
	   	result.map(function(item){
	   	  	if(item.imgflag == 0){
	   	  		item.imgUrl = ''
	   	  	}else{
	   	  	 	item.imgUrl = imgUrl(item.articleid);
	   	  	}
	   	  	return item;
	   	})
	   	data.data=result; 
	   	res.send(data);
	}
	switch (moduleName) {
		case 'xstj':
			query("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article limit  0, " + count,cb)

			break;
		case 'wbjx':

			query("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article limit  10, " + count,cb)

			break;
		case 'zjgx':
			query("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article where NOW() <=  DATE_ADD(FROM_UNIXTIME(lastupdate),INTERVAL 100 DAY)   order by lastupdate desc limit  0, " + count,cb)

			break;

		default: 
			break;
	}
	}
exports.list = function (req, res){  
    
   var sortid = req.param('sortid'),
   	   pageid = req.param('pageid'),
   	   pagesize = req.param('pagesize') || 10; 
   var data = {error:'request param error',pagesize:pagesize,pageid:pageid,data:[],count:0};
   if(!(sortid>0&&pageid>0&&pagesize>0)) res.send(data);  
   
   var where = ' WHERE sortid = ' + sortid; 
   var cb = function(result){
   	  data.error = ''; 
   	  result.map(function(item){
   	  	 if(item.imgflag == 0){
   	  	 	item.imgUrl = ''
   	  	 }else{
   	  	 	item.imgUrl = imgUrl(item.articleid);
   	  	 }
   	  	 return item;
   	  })
   	  data.data=result; 
   	  res.send(data);
   }  
   query("SELECT articleid,postdate,FROM_UNIXTIME(lastupdate) as lastupdate,articlename,author,sortid,lastchapter,intro,lastchapterid,fullflag,imgflag FROM jieqi_article_article " + where + " limit  " + (pageid - 1) * pagesize+ " , " + pagesize,cb); 
}
exports.book = function (req, res){
	var data = {error:'request param error',result:{}};
	var articleid = req.param('bookid');
	if(!(articleid>0)) res.send(data);
	query("SELECT articlename,author,sortid,fullflag,imgflag,FROM_UNIXTIME(postdate) as postdate,FROM_UNIXTIME(lastupdate) as lastupdate,lastchapter,lastchapterid,intro,chapters FROM jieqi_article_article WHERE  articleid = "+ articleid,function(value){
		var obj = value[0];  
		if(value.imgflag == 0){ 
			obj.imgUrl = ''; 
		}else{
			obj.imgUrl = imgUrl(articleid); 
		} 
		obj.intro = obj.intro.replace(/<\/p>/g,'');
		data.result = obj;
		data.error='';
		res.send(data);
	});

}
exports.categoryList = function(req, res) {
	query("select cid,pid,name from jieqi_article_category where display=1 order by cid asc",function(result){
		res.send(result);
	})
}
