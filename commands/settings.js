const { SlashCommandBuilder } = require('@discordjs/builders');

const settingschema = require('../schemas/serversettings')

const { emojis } = require('../settings.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Changes the settings of the bot')
		.addSubcommand(sub=>sub.setName('modlog').setDescription("Sets the modlog channel").addChannelOption(option=>option.setName('channel').setDescription('The modlog channel').setRequired(true)))

		.addSubcommand(sub=>sub.setName('memberlog').setDescription("Sets the memberlog channel").addChannelOption(option=>option.setName('channel').setDescription('The memberlog channel').setRequired(true)))

		.addSubcommand(sub=>sub.setName('messagelog').setDescription("Sets the messagelog channel").addChannelOption(option=>option.setName('channel').setDescription('The serverlog channel').setRequired(true)))

		.addSubcommand(sub=>sub.setName('serverlog').setDescription("Sets the serverlog channel").addChannelOption(option=>option.setName('channel').setDescription('The serverlog channel').setRequired(true)))

		.addSubcommand(sub=>sub.setName('mutedrole').setDescription("Sets the muted role for muted users").addRoleOption(option=>option.setName('role').setDescription('The muted role').setRequired(true)))

		.addSubcommand(sub=>sub.setName('modrole').setDescription("Sets the server's modrole, which gives them access to mod commands").addRoleOption(option=>option.setName('role').setDescription('The mod role').setRequired(true)))
		
		.addSubcommand(sub=>sub.setName('lockdown-channels').setDescription("Channels to lock during server lockdowb").addStringOption(option=>option.setName('channels').setDescription('List of channel ids, space to separate').setRequired(true))),
	async execute(interaction) {
		if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply(`${emojis.warn} | Only guild managers can change the server settings.`)
		await interaction.deferReply();
		const setting = await interaction.options.getSubcommand()
		let channel
		let role
		switch(setting){
			case 'modlog':
				 channel = interaction.options.getChannel('channel')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,modlogchannel:channel.id},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
			case 'memberlog':
				 channel = interaction.options.getChannel('channel')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,memberlogchannel:channel.id},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
			case 'messagelog':
				 channel = interaction.options.getChannel('channel')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,messagelogchannel:channel.id},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
			case 'serverlog':
				 channel = interaction.options.getChannel('channel')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,serverlogchannel:channel.id},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
			case 'mutedrole':
				 role = interaction.options.getRole('role')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,mutedrole:role.id},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
			case 'modrole':
				 role = interaction.options.getRole('role')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,modrole:role.id},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
			case 'lockdown-channels':
				 channels = interaction.options.getString('channels')
				await settingschema.findOneAndUpdate({_id:interaction.guild.id},{_id:interaction.guild.id,lockdownchannel:channels},{upsert:true})
				.catch(()=>{return interaction.followUp(`${emojis.fail} | Oops, a database error occured.`)})
				.then(()=>{return interaction.followUp(`${emojis.success} | Setting successfully updated.`)})
			break;
		}
	},
};