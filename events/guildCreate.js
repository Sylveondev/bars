module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(guild) {
		await console.log('Joined guild',guild.name)
		require('../deploycmds').register(guild.id)
	},
};