module.exports = function (client,str,msg){  return new Promise((resolve,reject) => {
		if (msg.mentions.channels.size) {
			resolve(msg.mentions.channels.first())
		} else {
			msg.guild.channels.fetch(str).then((m)=>{
				resolve(m)
			}).catch(()=>{resolve(msg.channel)})
		}
	})
}