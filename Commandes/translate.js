const { translate } = require("@vitalets/google-translate-api");
const Discord = require("discord.js")


module.exports = {
  name: "translate",
  description: "Traduit un message dans une autre langue",
  permission: "Aucune",
  category: "📌・Utilitaire",
  dm: false,
  options: [
    {
        type: "string",
        name: "traduire",
        description: "Votre message à traduire",
        required: true,
        autocomplete: false
    }, {
        type: "string",
        name: "langage",
        description: "Langage de la traduction",
        required: true,
        autocomplete: true
    }
  ],

  async run(bot, message, args) {

    const text = args.getString("traduire");
    const targetLang = args.getString("langage");

    const translation = await translate(text, { to: targetLang });
   
    let Embed = new Discord.EmbedBuilder()
    .setColor(bot.colorUtile)
    .setTitle("Traduction de texte")
    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
    .addFields({name: `Votre texte : `, value :`\`\`\`${text}\`\`\``})
    .addFields({name: `Texte traduit : `, value : `\`\`\`${(translation.text)}\`\`\``})
    .setTimestamp()
    .setFooter({ text: "Clear footer" })

    await message.channel.send({ embeds: [Embed] });
  }
}