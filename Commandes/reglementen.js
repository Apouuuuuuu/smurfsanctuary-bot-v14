const Discord = require("discord.js")

module.exports = {

    name: "reglementen",
    description: "Envoit l'embed du règlement anglais",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "📌・Utilitaire",
    options: [],

    async run(bot, message, args) {

        let Embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle("Rule")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: '1️⃣ Discord ToS', value: 'You must respect the Discord\'s ToS)'},
            { name: '2️⃣ Respect', value: 'You must respect other members'},
            { name: '3️⃣ Ad', value: 'You must not advertise (not even in DM). If you want to make a partnership request, the channel <#1091261839674986506> is available.'},
            { name: '4️⃣ Good faith', value: 'Don\'t play with the rules if a rule is not written in it, you must act in good faith.'},
            { name: '5️⃣ NSFW', value: 'No explicit content is allowed.'},
            { name: '6️⃣ DM', value: 'Do not harass staff for questions, the <#1091261839674986506> channel is available for all your requests.'},
        )
        .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1091343673410715748/reglement-interieur-entreprise.png")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId("reglementen")
            .setLabel("Accepter")
            .setStyle(Discord.ButtonStyle.Primary)
            .setEmoji("✅")
    );

await message.reply({ embeds: [Embed], components: [row] });

    }
}