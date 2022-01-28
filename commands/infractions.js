const { SlashCommandBuilder } = require('@discordjs/builders');

const infschema = require('../schemas/punishments')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infractions')
		.setDescription('Views a user\'s infractions')
		.addUserOption((option) => option.setName('user').setDescription('The user to boop').setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply();
		const user = await interaction.options.getUser('user') || interaction.member.user
		const setting = await settingschema.findOne({_id:interaction.guild.id})
		const inf = await infschema.findOne({ _id: user.id, _guildid: interaction.guild.id })
		if (!inf) return interaction.followUp({ content: ':x: | User doesn\'t have any infractions.' })
		if (!inf.type) return interaction.followUp({ content: ':x: | User doesn\'t have any infractions.' })


		let type = []
		let length = []
		let moderator = []
		let reason = []
		let pid = []
		if (inf) {
			if (inf.type) {
				inf.type.split("|").forEach(i => { type.push(i) })
				inf.reason.split("|").forEach(i => { reason.push(i) })
				inf.time.split("|").forEach(i => { length.push(i) })
				inf.moderator.split("|").forEach(i => { moderator.push(i) })
				inf.pid.split("|").forEach(i => { pid.push(i) })
			}
		}

		//Useless but works ig
		var parsed = []
		pid.forEach(i => {
			var index = pid.indexOf(i) //Get the index so this shit works
			parsed.push(`[${type[index] || 'Unknown punishment'} by ${moderator[index] || 'Unknown'}] Reason: ${reason[index] || 'Unknown'}, time: ${length[index] || 'N/A'}, pid: ${pid[index]}`)
		})

		interaction.followUp({
			embeds: [{
				description: `All infractions for ${user} (${type.length})\n` +
					`${parsed.join('\n')}`
			}]
		})
	},
	prefixname: 'infractions',
	prefixdescription: 'Gets all infractions for a user',
	async prefixed(client, message, args) {
		const finduser = require('../handlers/userfetcher')
		const user = await finduser(client, args[0], message)||message.author
		const inf = await infschema.findOne({ _id: user.id, _guildid: message.guild.id })
		if (!inf) return message.reply({ content: ':x: | User doesn\'t have any infractions.' })
		if (!inf.type) return message.reply({ content: ':x: | User doesn\'t have any infractions.' })


		let type = []
		let length = []
		let moderator = []
		let reason = []
		let pid = []
		if (inf) {
			if (inf.type) {
				inf.type.split("|").forEach(i => { type.push(i) })
				inf.reason.split("|").forEach(i => { reason.push(i) })
				inf.time.split("|").forEach(i => { length.push(i) })
				inf.moderator.split("|").forEach(i => { moderator.push(i) })
				inf.pid.split("|").forEach(i => { pid.push(i) })
			}
		}

		//Useless but works ig
		var parsed = []
		pid.forEach(i => {
			var index = pid.indexOf(i) //Get the index so this shit works
			parsed.push(`[${type[index] || 'Unknown punishment'} by ${moderator[index] || 'Unknown'}] Reason: ${reason[index] || 'Unknown'}, time: ${length[index] || 'N/A'}, pid: ${pid[index]}`)
		})

		message.reply({allowedMentions:{repliedUser:false},
			embeds: [{
				description: `All infractions for ${user} (${type.length})\n` +
					`${parsed.join('\n')}`
			}]
		})
	}
};