var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义todo对象模型
var BlogScheme = new Schema({
    title:String
    ,content:String
    ,pic:String
    ,ip:String
    ,status:{type:Boolean,default:false}
    ,creattime:{type:String,default:C.time()}
    ,updatetime:{type:String,default:C.time()}
    ,email:String
    ,author:String
    ,view:{type:Number,default:0}
});

//访问todo对象模型
mongoose.model('Blog', BlogScheme);
var Blog = mongoose.model('Blog');


exports.add = function(data,callback) {
    var d = new Blog();
    d.title = data.title;
    d.pic = data.pic;
    d.content = data.content;
    d.ip = data.ip;
    d.creattime = C.time();
    d.updatetime = C.time();
    d.email=data.email;
    d.author=data.author;
    d.status=data.status;


    d.save(function(err){
        if(err){
            console.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
    });
}

exports.update = function(where, data, callback) {
	
    exports.findBlogById(where, function(err, d) {
        if (err)
            callback(err);
        else {


            d.title = data.title;
            d.ip = data.ip;
            d.content = data.content;
            d.status=data.status;

            if(data.pic)
            {
                fs = require('fs');fs.unlink(C.static+d.pic);//删除图片
                d.pic = data.pic;
            }

            d.updatetime = C.time();


            d.save(function(err) {
                if (err) {
                    console.log('FATAL '+ err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}

exports.delete = function(id,row, callback) {

    if('undefined'!=typeof row)
    {
        row.remove(function(err) {
            if (err) {
                console.log('FATAL '+ err);
                callback(err);
            }
            else
            {

                console.log(C.static+row.pic);
                fs = require('fs');fs.unlink(C.static+row.pic);
                callback(null);
            }

        });
    }

}


exports.selectAll = function(where,page,perPage,callback) {
    //获取总数
    Blog.count(where, function (err, count) {
        //获取列表
        //console.log(where);
        Blog.find(where).sort({'_id':-1}).skip((page-1)*perPage).limit(perPage).exec(function(err,doc){
            var d= [];
            d.data = doc;
            d.count = count;
            callback(err,d);

        })
    });

}

/*exports.forAll = function(doEach, done) {
    Blog.find({}, function(err, docs) {
        if (err) {
            console.log('FATAL '+ err);
            done(err, null);
        }
        docs.forEach(function(doc) {
            doEach(null, doc);
        });
        done(null);
    });
}*/

var findBlogById = exports.findBlogById = function(id,callback){
    Blog.findOne({_id:id},function(err,doc){
        if (err) {
            console.log('FATAL '+ err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

exports.incview = function(id, callback) {
    exports.findBlogById(id, function(err, d) {

        if (err)
            callback(err);
        else {

           // d.$inc = { view : 1 };
            d.view =d.view+1;


            d.save(function(err) {
                if (err) {
                    console.log('FATAL '+ err);
                    callback(err);
                }
                else
                {
                    //console.log(d);
                    callback(d.view);

                }

            });
        }
    });

}

exports.count = function(where,callback) {
    //获取总数
    Blog.count(where, function (err, count) {

          callback(err,count);


    });

}



