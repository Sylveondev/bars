const { SlashCommandBuilder } = require('@discordjs/builders');

const settingschema = require('../schemas/serversettings')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('asciify')
		.setDescription('Decancers a user\'s nickname')
		.addUserOption(option=>option.setName("user").setDescription("The user to decancer").setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		var user = await interaction.options.getUser('user')
		
		const setting = await settingschema.findOne({ _id: interaction.guild.id })

		if (setting){
			if (!interaction.member.permissions.has('BAN_MEMBERS')){if (!interaction.member.roles.cache.has(setting.modrole)) return interaction.followUp(':x: | No permissions to use this command')}
		}else{
			if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.followUp(':x: | No permissions to use this command')
		}

		var validuser = await interaction.guild.members.fetch(user.id)
		.catch(()=>{})
		if (!validuser) return interaction.followUp(`:x: | That user isn't in the server`)
		
		if (user.id === interaction.member.id)
		return interaction.followUp(`:x: | You wouldn't want to do that on yourself.`)

		const owner = await interaction.guild.fetchOwner();
		if (user.id === owner.id)
		return interaction.followUp(`:x: | You can't kick the owner, silly goose.`)
		if(validuser.roles.highest.position >= interaction.member.roles.highest.position&&owner.id!==interaction.member.id)
		return interaction.followUp(`:x: | This user cannpt be kicked because they have the same role or higher than you.`)
		
		const decancer = require('decancer');
		validuser.setNickname(decancer(validuser.nickname||user.username))
		.then(()=>{interaction.followUp(`:ok_hand: | Successfully asciified **${user.tag}**'s nickname to \`${validuser.nickname}\`.`)})
		.catch(e=>{interaction.followUp(":x: | Unable to asciify user.")})
	}
};