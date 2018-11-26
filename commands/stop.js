exports.run = async (client, msg, args) => {
	try {
	const serverQueue = client.queue.get(msg.guild.id);
	if (!msg.member.voice) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Lu gak di VC ajg!'}});
	if (!serverQueue) return msg.channel.send({ embed: { color: 0xFF0000, description: 'Kan gak ada lagu ea qimaq apa yang mau di stop >:('}});
	if(serverQueue.voiceChannel.id !== msg.member.voice.channelID) return msg.channel.send({ embed: { color: 0xFF0000, description: `Ke **${serverQueue.voiceChannel.name}** lah kalau mau stopin lagunya!`}});
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('Stop command has been used!');
	return msg.channel.send({ embed: { color: 0xFF0000, description: 'Oksip dah stop akmj.'}});
	} catch (e) {
 	msg.channel.send(`Dih error :( \`${e}\` gegara Hazmi.`)
 	} 
}

exports.conf = {
   aliases: ['leave', 'disconnect']
}

exports.help = {
  name: 'stop' 
} 
