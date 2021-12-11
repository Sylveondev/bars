module.exports = {
	name: 'guildCreate',
	once: false,
	execute(guild) {
		require('../deploycmds').register(guild.id)
	},
};