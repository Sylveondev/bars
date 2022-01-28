const fs = require('fs');
const Discord = require('discord.js')

const client = new Discord.Client({intents:['GUILDS','GUILD_MESSAGES','GUILD_MEMBERS','DIRECT_MESSAGES']})

const { emojis } = require('./settings.json')

client.commands = new Discord.Collection();
client.prefixcommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	client.prefixcommands.set(command.data.prefixname, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		.catch(async e=>{await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })});
	}
});

client.on('messageCreate',async(message) => {
	//Remove this soon. No more, thank god
	
		if (message.author.bot || !message.guild) return;

		if (message.content == `<@!${message.guild.me.id}> slashcommands`||message.content == `<@${message.guild.me.id}> slashcommands`){
			require('./deploycmds').register(message.guild.id)
			message.reply(`${emojis.success} | Attempting to refresh slash commands`)
		}
})


client.login(process.env.token)

exports.client = client




const express = require('express');
const fetch = require("node-fetch");
const redis = require('redis');

// Express Application Instance
const app = express();

// Creating and connecting redis client to local instance (port 6379)
const redisClient = redis.createClient(6379);

// Echo Redis Error
redisClient.on('error', (err) => {
  console.log(err);
});

app.get('/',(req,res)=>{res.send(200)})
// Get User Posts
app.get('/posts', (req, res) => {
  const postsRedisKey = 'user:posts';
  return redisClient.get(postsRedisKey, (err, posts) => {
    if(posts){
      return res.json({ source: 'cache', data: JSON.parse(posts) })
    } else { // If Key does not exist in Redis

        // Fetching directly from remote api
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(result => result.json())
        .then(posts => {

          // Save the  API response in Redis store,  data expire time in 3600 seconds, means one hour
          redisClient.setex(postsRedisKey, 3600, JSON.stringify(posts));

          // Send response to client
          return res.json({ source: 'API', data: posts });

        })
        .catch(error => {
          // Error message
          console.log(error);
          // Send error to the client
          return res.json(error.toString());
        })
    }
  })
});

// Starting Express server at port 3000
app.listen(3000, () => {
  console.log('Server listening on port:', 3000);
});




require("./handlers/databasehandler").connect(process.env.mongodburl,process.env.mongodbusername,process.env.mongodbpassword,process.env.mongodbsource)

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
	console.log("Stack",error.stack)
	var s = require('./settings.json')
	if (s["error-channel"]){
	client.channels.fetch(s["error-channel"]).then(c=>{c.send(`An unhandledRejection error occured:\n\`\`\`${error.stack}\`\`\``)})
	}
});

process.on('error', error => {
	var s = require('./settings.json')
	if (s["error-channel"]){
	client.channels.fetch(s["error-channel"]).then(c=>{c.send(`An error occured:\n\`\`\`${error.stack}\`\`\``)})
	}
});
