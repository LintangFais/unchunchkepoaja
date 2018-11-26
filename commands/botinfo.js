const Discord = require('discord.js')
const moment = require("moment");

exports.run = async (bot, message, arg) => {

    let datenow = moment(Date.now()).format('MMMM Do YYYY [@] HH:mm:ss [GMT+7]')
    function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
};
    let u = convertMS(bot.uptime);
    let uptime = u.d + " days : " + u.h + " hours : " + u.m + " minutes : " + u.s + " seconds"
    let detik = u.s + " seconds"
    let menit = u.m + " minutes"
    let jam = u.h + " hours"
    let hari = u.d + " days"
    let botcreated = moment(bot.user.createdAt).format('MMMM Do YYYY [@] HH:mm:ss [UTC]');

	let bicon = bot.user.displayAvatarURL;
	let botembed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(bicon)
  .setFooter(`Request by ${message.author.tag} | ${datenow}`)
	.setAuthor(`${bot.user.username} Infomation`)
	.addField(`Bot Information`, `• Bot ID **${bot.user.id}**\n• Bot Owner **BeLikeDoge#4352**\n• Created At **${botcreated}**`, true)
	.addField(`Bot Stats`, `• **${bot.guilds.size}** Guilds\n• **${bot.channels.size}** Channels\n• **${bot.users.size}** Users`, true)
	.addField(`Other Information`, `• Version **v1.0.4**\n• Community **Discordbots Development**\n• Bot Ping **${(bot.ping).toFixed(0)} ms**`, true)
  .addField(`Special People`, `• Sharif#9781`, true)
	.addField(`Uptime`, `• ${jam}\n• ${menit}\n• ${detik}`, true)
  message.channel.send(botembed)
}

exports.conf = {
  aliases: ["bi"],
  cooldown: 5
}

exports.help = {
  name:"botinfo",
  description: "showing bot information",
  usage: "botinfo"
}
