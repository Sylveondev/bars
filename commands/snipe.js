const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Snipes the last deleted message'),
	async execute(interaction) {
		await interaction.deferReply()
		const msg = client.snipes.get(interaction.channel.id)
			if (!msg) return interaction.followUp(`:x: There's no deleted messages to snipe in this channel.`)
			var {MessageEmbed} = require('discord.js')
			var embed = new MessageEmbed().setAuthor(msg.author, msg.member.user.displayAvatarURL())
	    .setDescription(msg.content)
	    .setFooter(`Sniped by ${interaction.author.tag}`)
			if (msg.image) embed.setImage(msg.image).addField('Attachments:',msg.image)
	    .setTimestamp();
	    interaction.followUp(embed);
	},
	prefixname: 'userinfo',
	prefixdescription: 'Gets info on a user',
	async prefixed(client,message,args) {
	
	}
};