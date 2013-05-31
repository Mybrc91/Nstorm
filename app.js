global.C = require(__dirname+"/app/conf/config").init(__dirname);
//express init
var app = require(__dirname+"/app/conf/express").init();
//路由定义
var route = require(__dirname+"/app/conf/route").init(app);
//建立链接DB
var MongoDb = require(C.model+"/init").init(app);
//HTTP端口
var http = require('http').createServer(app).listen(C.port, function(){});
  