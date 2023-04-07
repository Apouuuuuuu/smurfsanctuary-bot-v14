const Discord = require("discord.js")

module.exports = {

    name: "ticketpartner",
    description: "Envoit l'embed des tickets de partenaire",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "📌・Utilitaire",
    options: [],

    async run(bot, message, args) {

        let EmbedPartenariat = new Discord.EmbedBuilder()
        .setColor(bot.colorUtile)
        .setTitle("Demande de partenariat | Partnership request")
        .setImage('https://cdn.discordapp.com/attachments/1091340701402411069/1091353759071862826/de-prC3A8s-les-jeunes-se-saluent-C3A0-la-table-de-travail.png')
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const btnPartenariat = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ticketPartenariat")
        .setLabel("Créer un ticket | Create a ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("✉️"))

        await message.reply({embeds: [EmbedPartenariat], components: [btnPartenariat]})
    }
}