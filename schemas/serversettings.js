const mongoose = require('mongoose')

const reqstring = {
        type: String,
        required: true
    }

const serversettings = mongoose.Schema({
    _id: reqstring,
		modlogchannel: {type:String,default:null},
		memberlogchannel: {type:String,default:null},
		messagelogchannel: {type:String,default:null},
		serverlogchannel: {type:String,default:null},
		mutedrole: {type:String,default:null},
		modrole: {type:String,default:null},
		lockdownchannel: {type:String,default:null},
		levelingenabled: {type:Bool,default:false},
		leveledroles: {type: Array, default: [""]}
})

module.exports = mongoose.model('serversettings',serversettings)