const { SlashCommandBuilder } = require('@discordjs/builders');

var fetchmember = require('../handlers/userfetcher')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows a user\'s avatar')
		.addUserOption((option) => option.setName('user').setDescription('The user to search').setRequired(true)),
	async execute(interaction) {
		var user = await interaction.options.getUser('user')
		interaction.reply({
			embeds: [{
				title: user.tag,
				url: user.displayAvatarURL({ dynamic: true }) + "?size=1024",
				image: { url: user.displayAvatarURL({ dynamic: true }) + "?size=1024", color: 'RANDOM' }
			}]
		})
	},
	prefixname: 'avatar',
	prefixdescription: 'It\'s about to go wild',
	async prefixed(client, message, args) {
		var user = await fetchmember(client, args[0], message)
		console.log("Final user:" + user)
		message.reply({
			allowedMentions: { repliedUser: false }, embeds: [{
				title: user.tag,
				url: user.displayAvatarURL({ dynamic: true }) + "?size=1024",
				image: { url: user.displayAvatarURL({ dynamic: true }) + "?size=1024", color: 'RANDOM' }
			}]
		})
	},
};