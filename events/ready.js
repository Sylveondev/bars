module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		
		console.log(`Ready! Logged in as ${client.user.tag}`);
		var ms = require('ms');

		// This is specifically for my disord server, since I retired spongeybot and Spongey MEE6. 
		// Your bot won't execute these lines.
		// I will not provide any help in getting this to work.
		// You're on your own in figuring out how to run this.
		if (client.user.id = "891539642246123530"){
			require('../autoicon').run(client);
			setInterval(async ()=>{var g = await client.guilds.fetch('891539642246123530')
		
			g.roles.edit('899513337484828744',{color:"RANDOM"},'Random color role change')},ms('5m'))
		}
	},
};