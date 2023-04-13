const Discord = require("discord.js")

module.exports = {

    name: "ticket",
    description: "Envoit l'embed des tickets d'achat",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "📌・Utilitaire",
    options: [],

    async run(bot, message, args) {

        let EmbedAchat = new Discord.EmbedBuilder()
        .setColor(bot.colorUtile)
        .setTitle("Acheter un compte | Buy Account")
        .setImage('https://cdn.discordapp.com/attachments/1091340701402411069/1091352580677980202/651136.png')
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const btnAchat = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ticketAchat")
        .setLabel("Créer un ticket | Create a ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("✉️"))

        await message.reply({embeds: [EmbedAchat], components: [btnAchat]})
    }
}