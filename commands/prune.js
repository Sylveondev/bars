const { SlashCommandBuilder } = require('@discordjs/builders');

const settingschema = require('../schemas/serversettings')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Deletes a certain amount of messages')
		.addNumberOption((option) => option.setName('messages').setDescription('How much messages to purge').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const numsg = await interaction.options.getNumber('messages')

		const setting = await settingschema.findOne({_id:interaction.guild.id})
		
		if (setting){
			if (!interaction.member.permissions.has('BAN_MEMBERS')){if (!interaction.member.roles.cache.has(setting.modrole)) return interaction.followUp(':x: | No permissions to use this command')}
		}else{
			if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.followUp(':x: | No permissions to use this command')
		}

		if (numsg < 2 || numsg > 100) return interaction.followUp(`:x: | Number of messages must be greater than 2 and less than 100`);
		
		var messages = await interaction.channel.messages.fetch({limit: numsg})	
		
		interaction.channel.bulkDelete(messages,true)
		.then((m)=>{interaction.channel.send(`:ok_hand: | **${m.size}** messages has been pruned.`)})
		.catch(()=>{interaction.followUp(`:x: | Unable to prune messages.`)})
	},
	prefixname: 'prune',
	prefixdescription: 'Deletes messages in a channel',
	async prefixed(client,message,args) {
		const numsg = args[0]

		const setting = await settingschema.findOne({_id:message.guild.id})
		
		if (setting){
			if (!message.member.permissions.has('BAN_MEMBERS')){if (!message.member.roles.cache.has(setting.modrole)) return message.reply(':x: | No permissions to use this command')}
		}else{
			if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply(':x: | No permissions to use this command')
		}

		if (numsg < 2 || numsg > 100) return message.reply(`:x: | Number of messages must be greater than 2 and less than 100`);
		
		var messages = await message.channel.messages.fetch({limit: numsg})	
		
		message.channel.bulkDelete(messages,true)
		.then((m)=>{message.channel.send(`:ok_hand: | **${m.size}** messages has been pruned.`)})
		.catch(()=>{message.reply(`:x: | Unable to prune messages.`)})
	}
};