const { emojis } = require('../settings.json')
module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
		if (message.author.bot || !message.guild) return;
		if (message.content == `<@!${message.guild.me.id}> slashcommands`||message.content == `<@${message.guild.me.id}> slashcommands`){
			require('../deploycmds').register(message.guild.id)
			message.reply(`${emojis.success} | Attempting to refresh slash commands`)
		}
	},
};