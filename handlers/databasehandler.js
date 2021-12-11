const mongoose = require('mongoose');
const logger = require("../tools/logger")


exports.connect=async(url,user,pass,source)=>{
	try{
		logger.log("Now connecting to MongoDB")
	this.db = await mongoose.connect(url,{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	  useCreateIndex: false,
    autoIndex: false,
		authSource: source,
		auth: {
    	user: user,
      password: pass
    }
	})
	logger.success(`MongoDB database connected!`)	
	}catch(err){
		logger.error(`MongoDB database connection failed. Reason: ${err}`)
	}
}
exports.dispose=async()=>{
	try{
	this.db.connection.close()
	logger.warn("MongoDB database connect dispose")
	}catch(err){
		logger.error("Unable to dispose MongoDB connection. This is most common when your database failed to login previously.")
	}
}