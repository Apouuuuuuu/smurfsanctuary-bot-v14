const Discord = require("discord.js")

module.exports = {

    name: "ticketother",
    description: "Envoit l'embed des tickets d'autre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "📌・Utilitaire",
    options: [],

    async run(bot, message, args) {

        let EmbedAchat = new Discord.EmbedBuilder()
        .setColor(bot.colorUtile)
        .setTitle("Autre demande | Other request")
        .setImage('https://cdn.discordapp.com/attachments/1091340701402411069/1091355556733779988/question-mark-background-1909040_960_720.png')
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const btnAchat = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ticketAutre")
        .setLabel("Créer un ticket | Create a ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("✉️"))

        await message.reply({embeds: [EmbedAchat], components: [btnAchat]})
    }
}