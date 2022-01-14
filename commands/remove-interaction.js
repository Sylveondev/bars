const { SlashCommandBuilder } = require('@discordjs/builders');

const infschema = require('../schemas/punishments')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-infraction')
		.setDescription('Views a user\'s infractions')
		.addUserOption((option) => option.setName('user').setDescription('The user to boop').setRequired(true))
		.addStringOption((option) => option.setName('pid').setDescription('The id of the punishment').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const user = await interaction.options.getUser('user')
		const userpid = await interaction.options.getString('pid')
		const inf = await infschema.findOne({_id:user.id,_guildid:interaction.guild.id})
		if (!inf) return interaction.followUp({content:':x: | User doesn\'t have any infractions.'})
		if (!inf.type) return interaction.followUp({content:':x: | User doesn\'t have any infractions.'})


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

		var found = false;
		pid.forEach(i=>{
			if (i === userpid){
				found = true;
				var index = pid.indexOf(i)
				type.splice(index)
				length.splice(index)
				moderator.splice(index)
				reason.splice(index)
				pid.splice(index)
			}
		})
		if (!found) return interaction.followUp(`:x: | Infraction doesn't exist`)

		await infschema.findOneAndUpdate({_id:user.id,_guildid:interaction.guild.id},{_id:user.id,_guildid:interaction.guild.id,type:type.join(`|`),time:length.join('|'),reason:reason.join('|'),moderator:moderator.join('|'),pid:pid.join('|')},{upsert:true})
		.catch(()=>{interaction.followUp(`:warning: | Oops, something went wrong while saving to the database. Continuing anyway`)})

		user.send({embeds:[{
			author:{name:`${interaction.client.user.tag}`,icon_url:interaction.client.user.displayAvatarURL()},
			description:`Punishments updated in ${interaction.guild.name}`,
			fields:[
				{name:'Type',value:'infraction removed',inline:true},
				{name:'Moderator',value:`${interaction.member}`,inline:true},
				{name:'Punishment ID',value:`${userpid}`,inline:true}
			],
			footer:{text:`You now have ${type.length} infractions`},
			timestamp: new Date(),
			color:'GREEN'
		}]}).catch(console.log)

		interaction.followUp({embeds:[
			{description:`Punishment ${userpid} for ${user} has been removed.`,color:'GREEN'}
		]})
	},
	prefixname: 'remove-infraction',
	prefixdescription: 'Removes a single infraction from a user',
	async prefixed(client,message,args) {
		const finduser = require('../handlers/userfetcher')
		const user = await finduser(client, args[0], message)
		const userpid = args[1]
		const inf = await infschema.findOne({_id:user.id,_guildid:message.guild.id})
		if (!inf) return message.reply({content:':x: | User doesn\'t have any infractions.'})
		if (!inf.type) return message.reply({content:':x: | User doesn\'t have any infractions.'})


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

		var found = false;
		pid.forEach(i=>{
			if (i === userpid){
				found = true;
				var index = pid.indexOf(i)
				type.splice(index)
				length.splice(index)
				moderator.splice(index)
				reason.splice(index)
				pid.splice(index)
			}
		})
		if (!found) return message.reply(`:x: | Infraction doesn't exist`)

		await infschema.findOneAndUpdate({_id:user.id,_guildid:message.guild.id},{_id:user.id,_guildid:message.guild.id,type:type.join(`|`),time:length.join('|'),reason:reason.join('|'),moderator:moderator.join('|'),pid:pid.join('|')},{upsert:true})
		.catch(()=>{message.reply(`:warning: | Oops, something went wrong while saving to the database. Continuing anyway`)})

		user.send({embeds:[{
			author:{name:`${client.user.tag}`,icon_url:client.user.displayAvatarURL()},
			description:`Punishments updated in ${message.guild.name}`,
			fields:[
				{name:'Type',value:'infraction removed',inline:true},
				{name:'Moderator',value:`${message.member}`,inline:true},
				{name:'Punishment ID',value:`${userpid}`,inline:true}
			],
			footer:{text:`You now have ${type.length} infractions`},
			timestamp: new Date(),
			color:'GREEN'
		}]}).catch(console.log)

		message.reply({embeds:[
			{description:`Punishment ${userpid} for ${user} has been removed.`,color:'GREEN'}
		]})
	}
};