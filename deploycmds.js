exports.register = async (guildId) => {
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = require('./index.js').client.user.id
const token = require('./index.js').client.token


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const rest = new REST({ version: '9' }).setToken(token);

var curcmds = await rest.get(Routes.applicationGuildCommands(clientId, guildId))
console.log(curcmds)
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(command)
	var dupe = false
	curcmds.forEach(cmd => {console.log(cmd);if (cmd.name === command.name){dupe = true}})
	
	if (dupe == false)commands.push(command.data.toJSON());
}




rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
}