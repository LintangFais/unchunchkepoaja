const { MessageEmbed } = require('discord.js')

exports.run = async (bot, msg, args) => {
     let embed = new MessageEmbed()
     .setColor("RANDOM")
     .setAuthor("Meliodas [BETA] Help !", bot.user.displayAvatarURL)
     .addField("🎀 Core", "`shardinfo`, `stats`, `ev`, `ex`")
     .addField("<a:MusicNote:513518117247254566> Music", "`play`, `stop`, `search`, `lyrics`, `loop`, `setbitrate`, `queue`, `pause`, `resume`, `skip`, `shuffle`, `nowplay`, `volume`")
     .setFooter(`• Message For ${msg.author.tag}`, msg.author.displayAvatarURL)
     
     msg.channel.send(embed)
     
}

exports.conf = {
   aliases: ['h']
}

exports.help = {
   name: 'help'
}
