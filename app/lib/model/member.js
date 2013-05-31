var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义todo对象模型
var Scheme = new Schema({ 
	name:String
	,password:String
	,email:String
	,regip:String
	,logip:String
    ,status:{type:Boolean,default:false}
    ,createtime:{type:String,default:C.time()}
	,logintime:{type:String,default:C.time()}
    ,postnum:{type:Number,default:0}
});

//访问todo对象模型
mongoose.model('Member', Scheme);
var Member = mongoose.model('Member');

exports.add = function(data,callback) {
    var d = new Member(); 
	d.email = data.email;
	d.name = data.name;
	d.regip = data.regip;
	d.logip = data.logip;
	d.createtime = C.time();
	d.logintime = C.time();
	 
	d.save(function(err){
		if(err){
			callback(err);
		}else{
			callback(d._id);
		}
	});
};

exports.update = function(where,data,callback) {
	Member.findOne(where,function(err,d){

		d.email = data.email;
		d.name = data.name;
		d.regip = data.regip;
		d.logintime = C.time();
		d.logip = data.logip;

		d.save(function(err){
			if(err){
				callback(err); 
			}else{
				callback(d.id);
			}
		});
	});
};


exports.updateStatus = function(where,data,callback) {
    Member.findOne(where,function(err,d){

        d.status = data.status;

        d.save(function(err){
            if(err){
                callback(err);
            }else{
                callback(d.id);
            }
        });
    });
};




//exports.count = function(where,callback)
//{
//	Member.count(where,function(err,count){
//		if(count>0)
//		{
//			callback(count);
//		}
//		else
//		{
//			callback(0);
//		}
//	})
//}

exports.findOne = function(where,callback)
{
	Member.findOne(where,function(err,data){						  
		if(data)
		{
			callback(data);
		}
		else
		{
			callback(0);
		}
	})
}

/**
 *
 * @param where {key:val}
 * @param limit num
 * @param bysort {key:-1}
 * @param callback
 */
exports.findAll = function(where,limit,bysort,callback)
{
	Member.find(where).sort(bysort).limit(limit).exec(function(err,data){

		if(data)
		{
			callback(data);
		}
		else
		{
			callback(0);
		}
	})
}


exports.incpostnum = function(email,num, callback) {

    Member.findOne({email:email},function(err,d){

        if(err)
        {
            callback(err);
        }
        else
        {
            d.postnum =num;

            d.save(function(err) {
                if (err) {
                    callback(err);
                }
                else
                {
                    console.log(d);
                    callback(num);

                }

            });
        }
    })





}

/**
 * 获取总数
 * @param where
 * @param callback
 */
exports.count = function(where,callback) {

    Member.count(where, function (err, count) {

        callback(err,count);


    });

}
