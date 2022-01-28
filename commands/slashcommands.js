const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slashcommands')
		.setDescription('Updates slash commands'),
	async execute(interaction) {
		if (interaction.member.permissions.has('MANAGE_GUILD')){
			require('../deploycmds').register(interaction.guild.id)
			interaction.reply(`:ok_hand: | Attempting to refresh slash commands`)
		}
	}
};