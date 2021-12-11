const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Views commands and their uses'),
	async execute(interaction) {
		await interaction.reply(`:question: | Just use slash commands to view the commands and their uses :\\)`);
	},
};