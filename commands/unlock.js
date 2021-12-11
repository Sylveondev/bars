const { SlashCommandBuilder } = require('@discordjs/builders');

const settingschema = require('../schemas/serversettings')

const { emojis } = require('../settings.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlocks stuff')
		.addSubcommand(sub=>sub.setName('channel').setDescription("Unlocks the channel").addChannelOption(option=>option.setName('channel').setDescription('The channel to unlock').setRequired(false))
		.addStringOption(option=>option.setName('reason').setDescription('The reason for unlocking the channel').setRequired(false)))

		.addSubcommand(sub=>sub.setName('server').setDescription("Unlocks the server").addStringOption(option=>option.setName('reason').setDescription('The reason for unlocking the server').setRequired(false))),

		async execute(interaction) {
			if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply(`${emojis.warn} | No permissions to use this command.`)
			await interaction.deferReply();
			const setting = await interaction.options.getSubcommand()
			let channel
			let reason
			switch(setting){
				case 'channel':
					channel = interaction.options.getChannel('channel') || interaction.channel
					reason = interaction.options.getString('reason') || "no reason..."
					try{
						channel.permissionOverwrites.edit(interaction.guild.roles.everyone,{SEND_MESSAGES:true})
						.then(()=>{interaction.followUp(`${emojis.success} | ${channel} has been unlocked for ${reason}`)})
					}catch(e){
						console.log(`did not unlock ${channel.id} because`,e)
						interaction.followUp(`${emojis.fail} | An error occured`)
					}
				break;
				case 'server':
					reason = interaction.options.getString('reason') || "no reason..."

					interaction.followUp(`${emojis.warn} | Server unlock started`)
					
					const setting = await settingschema.findOne({_id:interaction.guild.id})

					if (!setting) return interaction.followUp(`${emojis.warn} | No channels were set to unlock.`)

					if (!setting.lockdownchannel) return interaction.followUp(`${emojis.warn} | No channels were set to unlock.`)

					var lockdownchannel = setting.lockdownchannel.slice().trim().split(/ +/)

					console.log('unlocking',lockdownchannel)
					for (let i = 0; i < lockdownchannel.length; i++) {
						setTimeout(function timer() {
							unlocks(interaction,lockdownchannel[i])
							completion(interaction,i,lockdownchannel,reason)
						}, i * 1500);
					}
						
					
					
				break;
			}
		}
}

function completion(interaction,i,channels,reason){
	if ((i+1) === channels.length){
		interaction.followUp(`${emojis.success} | The server has been unlock for ${reason}`)
	}
}

function unlocks(interaction,c) {
	interaction.guild.channels.fetch(c).then((channel) => {
								channel.permissionOverwrites.edit(interaction.guild.roles.everyone,{SEND_MESSAGES:true})
								.then(()=>{
									
									if (channel.id !== interaction.channel.id){
										channel.send(`${emojis.success} | The server has been unlocked. You may talk again.`)
									}

								}).catch((e)=>{`did not unlock ${c} because`,e})
							}).catch((e)=>{console.log(`did not unlock ${c} because`,e)})
}