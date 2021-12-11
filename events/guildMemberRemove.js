module.exports = {
	name: 'guildMemberRemove',
	once: false,
	async execute(member) {
		const settingschema = require('../schemas/serversettings')

		const setting = await settingschema.findOne({_id:member.guild.id})

		if (setting){
			if (setting.memberlogchannel){
				var memberlog = await member.guild.channels.fetch(setting.memberlogchannel)
				.catch(()=>{return})
				if (!memberlog) return;

				memberlog.send({embeds:[
					{
						title:'Member left',
						description:`${member}`,
						fields:[
							{name:"Roles",value:`${member.roles.cache.map(m=>m)||"Unknown"}`}
						],
						thumbnail:{url:member.user.displayAvatarURL({dynamic:true,size:1024})},
						color:`BLACK`,
						footer:{text:`ID: ${member.id}`},
						timestamp:new Date()
					}
				]})
			}
		}
	},
};