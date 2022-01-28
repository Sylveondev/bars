module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		require('../autoicon').run(client);
		console.log(`Ready! Logged in as ${client.user.tag}`);
		var ms = require('ms');

		setInterval(async ()=>{var g = await client.guilds.fetch('891539642246123530')
		
		g.roles.edit('899513337484828744',{color:"RANDOM"},'Random color role change')},ms('5m'))
	},
};