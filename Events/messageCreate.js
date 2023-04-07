const Discord = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = async(bot, message) => {

    // Vérifier si l'auteur du message est un bot ou si le message a été envoyé en DM
    if (message.author.bot || message.channel.type === 'dm') return;
    let db = bot.db;
   

    if (message.content.match(/discord\.gg|discord\.com\/invite\/|discordapp\.com\/invite\/|discord\.me|http:\/\//gi)) {
        await message.delete();
        await message.author.send("Les liens dans ce genre ne sont pas autorisés sur ce serveur.");

        let EmbedMsgLogs = new Discord.EmbedBuilder()
        .setColor(bot.colorModeration)
        .setTitle("Logs")
        .setDescription(`Message supprimé par le bot`)
        .addFields(
            { name: '▶️ Auteur :', value: `\`\`\`${message.author.tag}\`\`\`` },
            { name: '▶️ Contenu :', value: `\`\`\`${message.content}\`\`\`` },
            { name: '▶️ Channel :', value: `<#${message.channel.id}>` },
        )
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        
        message.guild.channels.cache.get('1091284655568859138').send({ embeds: [EmbedMsgLogs] });
        return;
      }
      

  db.query(
    `SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`,
    async (err, req) => {
      if (req.length < 1) {
        db.query(
          `INSERT INTO xp (guild, user, xp ,level) VALUES ('${message.guildId}','${message.author.id}', '0', '0')`
        );
      } else {
        let level = parseInt(req[0].level);
        let xp = parseInt(req[0].xp);

        if ((level + 1) + 1 * 1000 <= xp) {
          db.query(
            `UPDATE xp SET xp = '${xp - ((level + 1) + 1 * 1000)}' WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`
          );
          db.query(
            `UPDATE xp SET level = '${level + 1}' WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`
          );

          await message.channel.send(
            `${message.author} est passé niveau ${level + 1}.`
          );
        } else {
          let xptogive = Math.floor(Math.random() * 30) + 1;
          db.query(
            `UPDATE xp SET xp = '${xp + xptogive}' WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`
          );
        }
      }
    }
  );

  let EmbedMsgLogs = new Discord.EmbedBuilder()
        .setColor(bot.colorInformation)
        .setTitle("Logs")
        .setDescription(`Message envoyé`)
        .addFields(
            { name: '▶️ Auteur :', value: `\`\`\`${message.author.tag}\`\`\`` },
            { name: '▶️ Contenu :', value: `\`\`\`${message.content}\`\`\`` },
            { name: '▶️ Channel :', value: `<#${message.channel.id}>` },
        )
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        
        message.guild.channels.cache.get('1091280770045317170').send({ embeds: [EmbedMsgLogs] });

};
