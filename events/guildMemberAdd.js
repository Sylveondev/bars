module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
		const settingschema = require('../schemas/serversettings')

		const setting = await settingschema.findOne({_id:member.guild.id})

		if (setting){
			if (setting.memberlogchannel){
				var memberlog = await member.guild.channels.fetch(setting.memberlogchannel)
				.catch(()=>{})
				if (memberlog) {

				memberlog.send({embeds:[
					{
						title:'Member joined',
						description:`${member}`,
						thumbnail:{url:member.user.displayAvatarURL({dynamic:true,size:1024})},
						color:`BLACK`,
						footer:{text:`ID: ${member.id}`},
						timestamp:new Date()
					}
				]})}
			}
			if (setting.welcomechannel){
				var welcomechannel = await member.guild.channels.fetch(setting.welcomechannel)
				var text = await member.guild.channels.fetch(setting.welcometext)
				.catch(()=>{})
				if (welcomechannel) {

					//Now for the grusome part of filtering this.
					var filteredtext

					filteredtext = text.replace(/{{servername}}/i, member.guild.name)
		
					filteredtext = filteredtext.replace(/{{member}}/i, member)
		
					filteredtext = filteredtext.replace(/{{membertag}}/i, member.user.tag)
		
					filteredtext = filteredtext.replace(/{{membername}}/i, member.user.username)
		
					filteredtext = filteredtext.replace(/{{memberid}}/i, member.id)
		
					filteredtext = filteredtext.replace(/{{membercount}}/i, member.guild.memberCount)
		
					filteredtext = filteredtext.replace(/{{joindate}}/i, member.joinedAt.toDateString())
		
					filteredtext = filteredtext.replace(/{{creationdate}}/i, member.user.createdAt.toDateString())
					
					welcomechannel.send(filteredtext).catch(console.error);
				}
				
			}
		}
	},
};