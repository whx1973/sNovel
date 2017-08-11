var express = require('express'),
	http = require('http'),
	novel = require('./routes/novel'),
	chapter = require('./routes/chapter')
	bodyParser = require('body-parser'),
	path = require('path');


var app = express();

app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

//小说分类list
app.get('/sort/:sortid/:pageid/:pagesize?',novel.list);

//小说详情
app.get('/book/:bookid',novel.book);

//章节详情
app.get('/chapter/:bookid/:chapterid',chapter.detail);

//章节分页
app.get('/chapterlist/:bookid/:pageid/:pagesize/:order',chapter.list);

//全部章节
app.get('/chapterlist/:bookid/:order',chapter.allList);


//prev 章节
app.get('/chapterprev/:bookid/:chapterid',chapter.prev);

//next 章节
app.get('/chapternext/:bookid/:chapterid',chapter.next);

//app.get('/sort',novel.sort);

//书架  完本 

//图书模块   新书抢先 完本精选 最近更新
app.get('/moduleName/:moduleName/:count',novel.bookModule)

app.get('/categoryList',novel.categoryList)

http.createServer(app).listen(app.get('port'),function() {
	console.log('Express server listening on port' + app.get('port'));
})