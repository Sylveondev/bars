const { SlashCommandBuilder } = require('@discordjs/builders');

const settingschema = require('../schemas/serversettings')

const { emojis } = require('../settings.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lockdown')
		.setDescription('Locks stuff')
		.addSubcommand(sub=>sub.setName('channel').setDescription("Locks the channel").addChannelOption(option=>option.setName('channel').setDescription('The channel to lock').setRequired(false))
		.addStringOption(option=>option.setName('reason').setDescription('The reason for locking the channel').setRequired(false)))

		.addSubcommand(sub=>sub.setName('server').setDescription("Locks the server").addStringOption(option=>option.setName('reason').setDescription('The reason for locking the server').setRequired(false))),

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
						channel.permissionOverwrites.edit(interaction.guild.roles.everyone,{SEND_MESSAGES:false})
						.then(()=>{interaction.followUp(`${emojis.success} | ${channel} has been locked for ${reason}`)})
					}catch(e){
						console.log(`did not lock ${channel.id} because`,e)
						interaction.followUp(`${emojis.fail} | An error occured`)
					}
				break;
				case 'server':
					reason = interaction.options.getString('reason') || "no reason..."

					interaction.followUp(`${emojis.warn} | Lockdown started`)
					
					const setting = await settingschema.findOne({_id:interaction.guild.id})

					if (!setting) return interaction.followUp(`${emojis.warn} | No channels were set to lockdown.`)

					if (!setting.lockdownchannel) return interaction.followUp(`${emojis.warn} | No channels were set to lockdown.`)

					var lockdownchannel = setting.lockdownchannel.slice().trim().split(/ +/)

					console.log('locking',lockdownchannel)
					for (let i = 0; i < lockdownchannel.length; i++) {
						setTimeout(function timer() {
							locks(interaction,lockdownchannel[i])
							completion(interaction,i,lockdownchannel,reason)
						}, i * 1500);
					}
					
					
				break;
			}
		},
	prefixname: 'lockdown',
	prefixdescription: 'Locks a channel or the server',
	async prefixed(client,message,args) {
		if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`${emojis.warn} | No permissions to use this command.`)
			const setting = args[0]
			let channel
			let reason
			switch(setting){
				case 'all':
					reason = args.slice(1).join(" ") || "no reason..."

					message.reply(`${emojis.warn} | Lockdown started`)
					
					const setting = await settingschema.findOne({_id:message.guild.id})

					if (!setting) return message.reply(`${emojis.warn} | No channels were set to lockdown.`)

					if (!setting.lockdownchannel) return message.reply(`${emojis.warn} | No channels were set to lockdown.`)

					var lockdownchannel = setting.lockdownchannel.slice().trim().split(/ +/)

					console.log('locking',lockdownchannel)
					for (let i = 0; i < lockdownchannel.length; i++) {
						setTimeout(function timer() {
							locks(message,lockdownchannel[i],true)
							completion(message,i,lockdownchannel,reason,true)
						}, i * 1500);
					}
					
					
				break;
				default:
					channel = message.mentions.channels.first() || message.channel
					if (message.mentions.channels.first()){ args.shift() }
					reason = args.join(" ") || "no reason..."
					try{
						channel.permissionOverwrites.edit(message.guild.roles.everyone,{SEND_MESSAGES:false})
						.then(()=>{message.reply(`${emojis.success} | ${channel} has been locked for ${reason}`)})
					}catch(e){
						console.log(`did not lock ${channel.id} because`,e)
						message.reply(`${emojis.fail} | An error occured`)
					}
			}
	}
}

function completion(interaction,i,channels,reason,prefix){
	if (prefix){
	if ((i+1) === channels.length){
		interaction.reply(`${emojis.success} | The server has been lock for ${reason}`)
	}}else{
	if ((i+1) === channels.length){
		interaction.followUp(`${emojis.success} | The server has been lock for ${reason}`)
	}}
}

function locks(interaction,c,prefix) {

  interaction.guild.channels.fetch(c).then((channel) => {
								channel.permissionOverwrites.edit(interaction.guild.roles.everyone,{SEND_MESSAGES:false})
								.then(()=>{
									
									if (channel.id !== interaction.channel.id){
										channel.send(`${emojis.warn} | The server is on lockdown. See ${interaction.channel} for more info.`)
									}

								}).then(()=>{`locked ${c}`})
								.catch((e)=>{`did not lock ${c} because`,e})
							}).catch((e)=>{console.log(`did not lock ${c} because`,e)})
}