const Discord = require("discord.js")

module.exports = {

    name: "countryrole",
    description: "Envoit l'embed des pays",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "📌・Utilitaire",
    options: [],

    async run(bot, message, args) {

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.colorUtile)
        .setTitle("Langage | Language")
        .setDescription("Select your langage | Sélectionne ta langue")
        .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1091340730326323260/1200x680_francais-anglais-langue-origines.png")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId("english")
            .setLabel("English")
            .setStyle(Discord.ButtonStyle.Primary)
            .setEmoji("🇬🇧"),
        new Discord.ButtonBuilder()
            .setCustomId("france")
            .setLabel("Français")
            .setStyle(Discord.ButtonStyle.Primary)
            .setEmoji("🇫🇷")
    );

await message.reply({ embeds: [Embed], components: [row] });

    }
}