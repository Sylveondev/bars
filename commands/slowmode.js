const { SlashCommandBuilder } = require('@discordjs/builders');

const infschema = require
('../schemas/punishments')

const s = require('../tools/s')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Changes a channel\'s slowmode')
		.addChannelOption((option) => option.setName('channel').setDescription('The channel to take change slowmode of').setRequired(false))
		.addStringOption((option) => option.setName('time').setDescription('How long to change it to').setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply();
		const channel = await interaction.options.getChannel('channel')||interaction.channel
		const timestring = await interaction.options.getString('time')

		if (timestring){
			if (channel.type!=='GUILD_TEXT') return interaction.followUp(`:x: | That's not a text channel.`)
			var time = s(`${timestring}`)
			if (time > 21600 || time < 0) return interaction.followUp(`:x: | Invalid number specified`)
			channel.setRateLimitPerUser(time)
			.catch(()=>{return interaction.followUp(`:x: | Unable to change the slowmode of \`${channel.name}\`.`)})
			.then(()=>{
				interaction.followUp(`:ok_hand: | Changed slowmode of \`${channel.name}\` to ${s(time,{long:true})}.`)
			})
		}else{
			if (channel.type!=='GUILD_TEXT') return interaction.followUp(`:x: | That's not a text channel.`)
			interaction.followUp(`:timer: | Slowmode of \`${channel.name}\` is ${s(channel.rateLimitPerUser,{long:true})}`)
		}
	},
	prefixname: 'slowmode',
	prefixdescription: 'Changes the slowmode of a channel',
	async prefixed(client,message,args) {
		
	}
};