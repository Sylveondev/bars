const mongoose = require('mongoose')

const reqstring = {
        type: String,
        required: true
    }

const serversettings = mongoose.Schema({
    _id: reqstring,
		_guildid: reqstring,
		type: reqstring,
		reason: reqstring,
		moderator: reqstring,
		time: reqstring,
		pid: reqstring
})

module.exports = mongoose.model('punishments',serversettings)