const { RichEmbed } = require("discord.js");
const { post } = require('snekfetch');
const Discord = require('discord.js')
const moment = require('moment')
const path = require("path");
const kepo = require("discord.js").RichEmbed
const { resolve, join } = require("path");

exports.run = async (client, message, args, color) => {
  var bot = client;
  var msg = message;
  const serverQueue = bot.queue.get(msg.guild.id)
  owners_id.forEach(async function(owner) {
    if (message.author.id !== '300577300242759682') return;

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .addField(':inbox_tray: Input', '```js\n' + args.join(" ") + '```')

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'My Token';
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(output);
          embed.addField(':outbox_tray: Output', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField(':outbox_tray: Output', '```js\n' + output + '```');
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(error);
          embed.addField('<:no:435160985259737099> Error', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('<:no:435160985259737099> Error', '```js\n' + error + '```');
      }
      message.channel.send(embed);
    }
  })
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.conf = {
  aliases: ["eval", "ev", "e"],
  cooldowns: '0'
} 

exports.help = {
  name: "e",
  description: "evaluated",
  usage: "eval {some super javascript code}"
}

