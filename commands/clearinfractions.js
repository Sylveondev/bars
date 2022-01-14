const { SlashCommandBuilder } = require('@discordjs/builders');

const infschema = require('../schemas/punishments')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearinfractions')
		.setDescription('Clears all infractions from a user')
		.addUserOption((option) => option.setName('user').setDescription('The user to clear').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const user = await interaction.options.getUser('user')||interaction.member.user
		const inf = await infschema.findOne({_id:user.id,_guildid:interaction.guild.id})
		if (!inf) return interaction.followUp({content:':x: | User doesn\'t have any infractions.'})
		if (!inf.type) return interaction.followUp({content:':x: | User doesn\'t have any infractions.'})

		await infschema.findOneAndRemove({_id:user.id,_guildid:interaction.guild.id})
		.catch(err=>{return interaction.followUp(`:x: | Something went wrong`)})

		interaction.followUp(`:ok_hand: | All infractions for ${user.tag} was cleared`)
	},
	prefixname: 'clearinfraction',
	prefixdescription: 'Clears all of a user\'s infractions',
	async prefixed(client,message,args) {
		const finduser = require('../handlers/userfetcher')
		const user = await finduser(client, args[0], message)||message.author
		const inf = await infschema.findOne({_id:user.id,_guildid:message.guild.id})
		if (!inf) return message.reply({content:':x: | User doesn\'t have any infractions.'})
		if (!inf.type) return message.reply({content:':x: | User doesn\'t have any infractions.'})

		await infschema.findOneAndRemove({_id:user.id,_guildid:message.guild.id})
		.catch(err=>{return message.reply(`:x: | Something went wrong`)})

		message.reply(`:ok_hand: | All infractions for ${user.tag} was cleared`)
	}
};