const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows a user\'s avatar')
		.addUserOption((option) => option.setName('user').setDescription('The user to search').setRequired(true)),
	async execute(interaction) {
		var user = await interaction.options.getUser('user')
		interaction.reply({embeds:[{
			title: user.tag,
			url: user.displayAvatarURL({dynamic:true})+"?size=1024",
			image: {url:user.displayAvatarURL({dynamic:true})+"?size=1024",color:'RANDOM'}
		}]})
	},
};