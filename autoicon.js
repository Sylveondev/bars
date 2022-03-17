const ms = require('ms')
exports.run=async(client)=>{
	// This is code for my discord. You can try to utilize this in the ready event.
	let guild = await client.guilds.fetch('891539642246123530')
	let channel = await client.channels.fetch('904289755519418378')
	let messages = await channel.messages.fetch({ limit: 100 });
	let icons = messages.map(m=>m.attachments.first().url)

	let channeltwo = await client.channels.fetch('914802308058083329')
	let messagestwo = await channeltwo.messages.fetch({ limit: 100 });
	let invitebanner = messagestwo.map(m=>m.attachments.first().url)

	let channelthree = await client.channels.fetch('915343230445420644')
	let messagesthree = await channelthree.messages.fetch({ limit: 100 });
	let banners = messagesthree.map(m=>m.attachments.first().url)
	
	guild.setIcon(icons[Math.floor(Math.random()*icons.length)])
	guild.setSplash(invitebanner[Math.floor(Math.random()*invitebanner.length)])
	guild.setBanner(banners[Math.floor(Math.random()*banners.length)])
	setInterval(async()=>{
		guild = await client.guilds.fetch('891539642246123530')
		channel = await client.channels.fetch('904289755519418378')
		messages = await channel.messages.fetch({ limit: 100 });
		icons = messages.map(m=>m.attachments.first().url)

		channeltwo = await client.channels.fetch('914802308058083329')
		messagestwo = await channeltwo.messages.fetch({ limit: 100 });
		invitebanner = messagestwo.map(m=>m.attachments.first().url)

		channelthree = await client.channels.fetch('915343230445420644')
		messagesthree = await channelthree.messages.fetch({ limit: 100 });
		banners = messagesthree.map(m=>m.attachments.first().url)

		guild.setIcon(icons[Math.floor(Math.random()*icons.length)])
		guild.setSplash(invitebanner[Math.floor(Math.random()*invitebanner.length)])
		guild.setBanner(banners[Math.floor(Math.random()*banners.length)])
	},ms('10m'))
}