const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping to discord'),
	async execute(interaction) {
		await interaction.reply(`:ping_pong: | Pong! \`${Math.round(interaction.client.ws.ping)}\`ms`);
	},
	prefixname: 'ping',
	prefixdescription: 'Bot ping',
	async prefixed(client,message,args) {
		await message.reply({allowedMentions:{repliedUser:false},content:`:ping_pong: | Pong! \`${Math.round(client.ws.ping)}\`ms`});
	}
	
};