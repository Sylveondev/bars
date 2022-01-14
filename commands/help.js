const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Views commands and their uses'),
	async execute(interaction) {
		await interaction.reply(`:question: | To get help, use \`bars.help\``);
	},
	prefixname: 'help',
	prefixdescription: 'This',
	async prefixed(client, message, args) {
		var helplist = client.commands.map(c => `\n> **\`${c.data.name}\`** | ${c.data.description}`)
		message.reply({
			allowedMentions: { repliedUser: false }, embeds: [
				{
					author: {
						name: client.user.tag,
						icon_url: client.user.displayAvatarURL()
					}, description: `There are **${client.commands.size}** commands registered.\n\n${helplist}`,
					color: "RANDOM", timestamp: new Date()
				}
			]
		})
	}
};