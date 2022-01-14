module.exports = function (client,str,msg){  return new Promise((resolve,reject) => {
		if (msg.mentions.members.size) {
			resolve(msg.mentions.members.first())
		} else {
			client.users.fetch(str).then((m)=>{
				resolve(m)
			}).catch(()=>{resolve(msg.author)})
		}
	})
}