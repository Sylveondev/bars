const { SlashCommandBuilder } = require('@discordjs/builders');
const c = require('../settings.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About the bot'),
	async execute(interaction) {
		await interaction.reply({
			embeds: [
				{
					author: { name: interaction.client.user.tag, icon_url: interaction.client.user.avatarURL() },
					description: `The Bars bot made by Spongey#4825 with discord.js v13, mongodb, and a really good vps probably better than yours maybe.\nNode version: ${process.version}\nD.js version: ${require('../package.json').dependencies['discord.js']}\nRest api: v9\n\n| ${c.support} | ${c.website} | ${c['source-code']} |`
				}
			]
		});
	},
	prefixname: 'about',
	prefixdescription: 'About the bot',
	async prefixed(client, message, args) {
		await message.reply({
			allowedMentions: { repliedUser: false }, embeds: [
				{
					author: { name: client.user.tag, icon_url: client.user.avatarURL() },
					description: `The Bars bot made by Spongey#4825 with discord.js v13, mongodb, and a really good vps probably better than yours maybe.\nNode version: ${process.version}\nD.js version: ${require('../package.json').dependencies['discord.js']}\nRest api: v9\n\n| ${c.support} | ${c.website} | ${c['source-code']} |`
				}
			]
		});
	},
};