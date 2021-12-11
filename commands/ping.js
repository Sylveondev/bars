const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping to discord'),
	async execute(interaction) {
		await interaction.reply(`:ping_pong: | Pinged. Looks like no errors`);
	},
};