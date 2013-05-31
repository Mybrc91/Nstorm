var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义todo对象模型
var BlogScheme = new Schema({
    title:String
    ,creattime:{type:String,default:C.time()}
    ,email:String
});

//访问todo对象模型
mongoose.model('Email', BlogScheme);
var Email = mongoose.model('Email');

exports.add = function(data,callback) {
    var d = new Email();
    d.title = data.title;
    d.creattime = C.time();
    d.email=data.email;



    d.save(function(err){
        if(err){
            console.log("FATAL"+err);
            callback(err);
        }else{
            callback(null);
        }
    });
}
