const {MessageButton,MessageActionRow} = require("discord.js")
module.exports = {
	name: 'messageUpdate',
	once: false,
	async execute(message,newmessage) {
		const settingschema = require('../schemas/serversettings')

		const setting = await settingschema.findOne({_id:message.guild.id})

		if (setting){
			if (setting.messagelogchannel){
				var messagelog = await message.guild.channels.fetch(setting.messagelogchannel)
				.catch(()=>{return})
				if (!messagelog) return;

				var b1 = new MessageButton()
				.setLabel("Jump to message")
				.setStyle("LINK")
				.setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)

				var bar = new MessageActionRow()
				.addComponents([b1])

				messagelog.send({embeds:[
					{
						author:{name:'Message deleted',icon_url:message.member.user.displayAvatarURL({dynamic:true,size:1024})},
						description:`Message my ${message.member} was updated in ${message.channel}`,
						fields:[
							{name:`Before`,value:message.content||"Unknown"},{name:`After`,value:newmessage.content||"Unknown"}
						],
						color:`BLACK`,
						footer:{text:`ID: ${message.member.id}`},
						timestamp:new Date(),
						
					}
				],components:[bar]})
			}
		}
	},
};