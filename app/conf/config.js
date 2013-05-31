var config = module.exports = {};

config.init = function(path)
{ 
	var date = new Date();
	var root = path;
	var app  = root+'/app';
	var conf = {	
	debug:true,
	port :3000,
	email :'ckken@qq.com',
	site_name :'NodeJs开发社区',
	site_desc :'研究nodejs方向',
	session_secret :'KenzRSecret',
    secret:'KensSecret',
	//db :'mongodb://ken:666666@a.okmine.com:27017/todo_dev',
	db :'mongodb://ken:666666@127.0.0.1:27017/sns',
	staticUrl :'s0.node.cc',
	surl :'',//css images js url
	//purl :'http://'+staticUrl,//data images url
	purl :'',//data images url
    maxAge: 259200000,
	version:'version beta 0.4.68.2013.5.31',
	
	//path
	root : root,
	app  : app,
	static:root+'/static',
	common:app+'/common',
	view:app+'/template',
	model:app+'/lib/model',
	action:app+'/lib/action',
	tpl:app+'/template/',
	site:app+'/site',
	//global function
	time:function(){return Math.round(date.getTime()/1000)},
	now: Math.round(date.getTime()/1000)
	
	}
	
	return conf;
} 