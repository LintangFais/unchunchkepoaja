const { handleVideo, youtube, prefix } = require('../index.js');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	
	const voiceChannel = msg.member.voice.channel;
	if (!voiceChannel) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Join VC nya dulu babyk!'}});
	if (!args[1]) return msg.channel.send({ embed: { color: 0xFF0000, description: `*Gini yang benar butjanc*: **${prefix}play** ***[Song Name]/[Video URL]/[Playlist URL]***`}});
        //if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `Wa lagi nyanyi di **${serverQueue.voiceChannel.name}** request di sana aja lah.`}});	
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT')) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Gak bisa mas00k ea qimaq, ngasih permiss yang benarlah'}});
	if (!permissions.has('SPEAK')) return msg.channel.send({ embed: { color: 0xFF0000,  description: 'Dih wa gak bisa bicara, ngasih permiss yang benarlah'}});
	if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		const playlist = await youtube.getPlaylist(url);
		const videos = await playlist.getVideos();
		for (const video of Object.values(videos)) {
			const video2 = await youtube.getVideoByID(video.id);
			await handleVideo(video2, msg, voiceChannel, true);
		}
		return msg.channel.send({ embed: { color: 0x008000,  description: `✅ Playlist: **${playlist.title}** dah kutambahin di qu eue!`}});
	} else {
		try {
			var video = await youtube.getVideo(url);
		} catch (error) {
			try {
				var videos = await youtube.searchVideos(searchString, 1);
				var video = await youtube.getVideoByID(videos[0].id);
			} catch (err) {
				return msg.channel.send('🆘 I could not obtain any search results.');
			}
		}
		return handleVideo(video, msg, voiceChannel);
	}
}

exports.conf = {
   aliases: ['p', 'fplay', 'qplay', 'quickplay', 'playnow']
}

exports.help = {
  name: 'forceplay'
}
 
