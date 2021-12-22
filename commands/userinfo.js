const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Shows info on a user')
		.addUserOption((option) => option.setName('user').setDescription('The user to search').setRequired(true)),
	async execute(interaction) {
		interaction.deferReply()
		var user = await interaction.options.getUser('user')
		var guildmember = await interaction.guild.members.fetch(user.id).catch(()=>{})
		if (guildmember){
			interaction.followUp({embeds:[{
				author:{
					name:`Userinfo for ${user.tag}`,
					icon_url:user.displayAvatarURL({dynamic:true})
				},
				description:`● **ID:** \`${user.id}\``+
				`\n● **Joined Discord:** <t:${parseInt(user.createdTimestamp / 1000, 10)}> (<t:${parseInt(user.createdTimestamp / 1000, 10)}:R>)`+
				`\n● **Avatar:** [\`Click here\`](${user.displayAvatarURL({dynamic:true})})`+
				`\n● **In server?:** ✅ Yes`+
				`\n● **Joined server:** <t:${parseInt(guildmember.joinedTimestamp / 1000, 10)}> (<t:${parseInt(guildmember.joinedTimestamp / 1000, 10)}:R>)`+
				`\n● **Roles:** ${guildmember.roles.cache.map(r=>r)}`+
				`\n● **Highest role:** ${guildmember.roles.cache.first()}`,
				color:'BLACK',
				thumbnail:user.displayAvatarURL({dynamic:true})
			}]})
		}else{
			interaction.followUp({embeds:[{
				author:{
					name:`Userinfo for ${user.tag}`,
					icon_url:user.displayAvatarURL({dynamic:true})
				},
				description:`● **ID:** \`${user.id}\``+
				`\n● **Joined Discord:** <t:1614034677> (<t:1614034677:R>)`+
				`\n● **Avatar:** [\`Click here\`](${user.displayAvatarURL({dynamic:true})})`+
				`\n● **In server?:** :x: No`,
				color:'BLACK',
				thumbnail:user.displayAvatarURL({dynamic:true})
			}]})
		}
	},
};