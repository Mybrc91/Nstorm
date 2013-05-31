var list = require('./base');

 list.index = function (req, res, next) {
  	  var _S = this;
	  var page = req.query.p;
	  var perPage = (req.query.pr)?req.query.pr:10;
	  var pageList = '';
	  //搜索
	  var where = {};
	  var s = req.query.s;
	  var s = eval("\/"+s+"\/i");
	  if('undefined'!=typeof req.query.s)
	  {
		  where.$or=[{title:s},{content:s}];
		  //where = {$or:[{title:s},{content:s}]};
	  }
	  where.status = true;
  
	  _S.blogDB.selectAll(where,page,perPage,function (err, todos) {
		  if (err) {
			  return next(err);
		  }
  
		  todos.data.forEach(function(vo){
			  vo.creattime = _S.date.dgm(vo.creattime,'yyyy-mm-dd hh:ii:ss');
			  vo.updatetime = _S.date.dgm(vo.updatetime,'yyyy-mm-dd hh:ii:ss');
			  vo.avatar = _S.encode.md5(vo.email);
			  vo.content = _S.html.delHtmlTag(vo.content);
			  vo.content = vo.content.substring(0,250);
		  })
  
		  pageList = _S.pN.pageNavi(page,todos.count,perPage);
		  res.render(C.spath+'index.html', {todos: todos.data,page:pageList});
	  });
  }



module.exports = list;
