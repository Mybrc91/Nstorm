var base = {
	
blogDB : require(C.model+'/blog'),
memberDB : require(C.model+'/member'),
pN : require(C.common+'/pageNavi'),
Up : require(C.common+'/upload'),
date : require(C.common+'/date'),
encode : require(C.common+'/encode'),
html : require(C.common+'/html'),

  init : function(req,res,next,a)
  {
	  var _S = this;
	  C.spath = C.site+'/'+C.g+'/tpl/';//静态路径
	  if('function'!==typeof _S[a])next();
	  if(_S.checkLogin(req,res,next)){
		  _S.userList(req,res,function(rs){
			   _S[a](req,res,next);
		  }); 
	  }
  },

  checkLogin : function(req,res){
	  var _S = this;
	  var userstr = req.signedCookies.user;
  
	  if('undefined'!==typeof userstr && userstr !='')
	  {
		  userstr = _S.encode.d(userstr);
		  var user = eval('(' + userstr + ')');
		  if('undefined'===typeof user)
		  {
			  res.redirect('/member/gate/login/');
			  return false;
		  }
		  else
		  {
			  user.avatar = _S.encode.md5(user.email);
	  
			  var headers = req.headers;
			  user.ip = headers['x-real-ip'] || headers['x-forwarded-for']||req.ip;
			  //console.log(headers);
			  global.user = user;//模块全局
			  //app.locals({user: user});//模版全局
			  return true;
		  }
	  }
	  else
	  {
		  res.redirect('/member/gate/login/');
		  return false;
	  }
  
  },
  
  userList : function(req,res,callback){
	  var where = {};
	  var _S = this;
	 // where.postnum ={$gt:0};
	 where.status =true;
	  var bysort = {'_id':-1};
  
	  _S.memberDB.findAll(where,28,bysort,function(data){
  
		  data.forEach(function(vo){
			  vo.avatar = _S.encode.md5(vo.email);
			  vo.createtime = _S.date.dgm(vo.createtime,'yyyy-mm-dd hh:ii:ss');
			  vo.logintime = _S.date.dgm(vo.logintime,'yyyy-mm-dd hh:ii:ss');
		  })
  
		  _S.memberDB.count({},function(err,count){
  
			  global.userdata = data;//模块全局
			  global.usernum = count;
			  callback(1);
		  })
  
		  //app.locals({userdata: data});//模版全局
  
	  });
  
  },
  

  
  content : function (req, res, next) {
  
  var _S = this;
	  if('undefined'!==typeof req.xdata)
	  {
		  var id = req.xdata.id;
	  _S.blogDB.findBlogById(id, function (err, row) {
		  if (err) {
			  return res.render('error.html', {message:err});
		  }
		  if (!row) {
			  return res.render('error.html', {message: '非法操作 找不到相关资源'});
		  }
  
		  row.creattime = _S.date.format(row.creattime,'yyyy-mm-dd hh:ii:ss');
		  row.updatetime = _S.date.format(row.updatetime,'yyyy-mm-dd hh:ii:ss');
		  row.avatar = _S.encode.md5(row.email);
  
		  _S.blogDB.incview(id,function(r){   
			  res.render(C.spath+'content.html', {todo: row,view:r});
		  });
  
	  });
	  }
	  else
	  {
		  next();
	  }
  }

}

module.exports = base;