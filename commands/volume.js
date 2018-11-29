const DBL = require('dblapi.js');

exports.run = async(client, msg, args) => {
    const serverQueue = client.queue.get(msg.guild.id);
    if (!msg.member.voice) return msg.channel.send({ embed: { color: 0xFF0000, description: 'You are not in a voice channel!'}});
		if (!serverQueue) return msg.channel.send({ embed: { color: 0xFF0000, description: 'There is nothing playing.'}});
		if(serverQueue.voiceChannel.id !== msg.member.voice.channelID) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to change the current volume`}});	
		if (!args[1]) return msg.channel.send({embed: { color: 0x32ffe7,  description: `The current volume is: **${serverQueue.volume}**%`}});
		serverQueue.volume = args[1];
    if (args[1] > 500) return msg.channel.send({ embed: { color: 0xFF0000, description: `${msg.author} Volume limit is 500%, please do not hurt yourself!`}});
    serverQueue.volume = args[1];
    if (args[1] > 500) return !serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 500) +
    msg.channel.send({ embed: { color: 0xFF0000, description: `${msg.author} Volume limit is 500%, please do not hurt yourself!`}});
 
    if (args[1] < 500) return serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 500) + msg.channel.send({ embed: { color: 0x008000, description: `I set the volume to: __**${args[1]}**%__`}});
    
  }


exports.conf = {
   aliases: ['v']
}


  exports.help = {
    name: 'volume' 
  } 
