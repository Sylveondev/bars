const { SlashCommandBuilder } = require('@discordjs/builders');

const infschema = require('../schemas/punishments')

const settingschema = require('../schemas/serversettings')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a member')
		.addUserOption((option) => option.setName('user').setDescription('The user to take action on').setRequired(true))
		.addStringOption((option) => option.setName('reason').setDescription('The reason for the action').setRequired(false)),
	async execute(interaction) {
		await interaction.deferReply();
		const user = await interaction.options.getUser('user')
		const reasonstring = await interaction.options.getString('reason')||"None specified"
		const inf = await infschema.findOne({_id:user.id,_guildid:interaction.guild.id})
		const setting = await settingschema.findOne({_id:interaction.guild.id})
		let thenewpid = Math.floor(Math.random()*1000000000000000)
		let type = []
		let length = []
		let moderator = []
		let reason = []
		let pid = []
		if (inf){
			if (inf.type){
				inf.type.split("|").forEach(i=>{type.push(i)})
				inf.reason.split("|").forEach(i=>{reason.push(i)})
				inf.time.split("|").forEach(i=>{length.push(i)})
				inf.moderator.split("|").forEach(i=>{moderator.push(i)})
				inf.pid.split("|").forEach(i=>{pid.push(i)})
			}
		}

		type.push(`unban`)
		length.push('N/A')
		moderator.push(`${interaction.member}`)
		reason.push(`${reasonstring}`)
		pid.push(thenewpid)

		if (setting){
			if (!interaction.member.permissions.has('BAN_MEMBERS')){if (!interaction.member.roles.cache.has(setting.modrole)) return interaction.followUp(':x: | No permissions to use this command')}
		}else{
			if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.followUp(':x: | No permissions to use this command')
		}

		await interaction.guild.bans.fetch()
		if (!interaction.guild.bans.cache.get(user.id)) return interaction.followUp(`:x: | This user is not banned, gg`)

		await infschema.findOneAndUpdate({_id:user.id,_guildid:interaction.guild.id},{_id:user.id,_guildid:interaction.guild.id,type:type.join(`|`),time:length.join('|'),reason:reason.join('|'),moderator:moderator.join('|'),pid:pid.join('|')},{upsert:true})
		.catch(()=>{interaction.followUp(`:warning: | Oops, something went wrong while saving to the database. Continuing anyway`)})

		interaction.guild.bans.remove(user,`(${interaction.user.tag}) ${reasonstring}`)

		interaction.followUp({embeds:[
			{description:`${user} has been unbanned.  \`${thenewpid||"Unknown"}\``,color:'GREEN'}
		]})

		if (setting){
			if (setting.modlogchannel){
				if (interaction.guild.channels.cache.get(setting.modlogchannel)){
					interaction.guild.channels.cache.get(setting.modlogchannel).send({
						embeds:[
							{
								title:`Unban`,
								fields:[{name:'Member',value:`${user}`,inline:true},
				{name:'Reason',value:reasonstring,inline:true},
				{name:'Moderator',value:`${interaction.member}`,inline:true},
				{name:'Punishment ID',value:`${thenewpid}`,inline:true}],
				color:`GREEN`,
				timestamp:new Date()
							}
						]
					}).catch(console.error)
				}
			}
		}
	},
};