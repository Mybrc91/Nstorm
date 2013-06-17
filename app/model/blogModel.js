var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = new Schema({
    _id     :Object
  , name    :String
  , email   :String
  , comment :String
  , date    :{type:String,default:C.time()}
});

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
    , comments  : [Comments]
    , meta      : {
            votes : {type:Number,default:0}
          , favs  : {type:Number,default:0}
        }
});

mongoose.model('Blog', BlogScheme);
var Blog = module.exports = mongoose.model('Blog');