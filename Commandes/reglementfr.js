const Discord = require("discord.js")

module.exports = {

    name: "reglementfr",
    description: "Envoit l'embed du règlement français",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "📌・Utilitaire",
    options: [],

    async run(bot, message, args) {

        let Embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle("Règlement")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: '1️⃣ Discord ToS', value: 'Tu dois respecter les ToS de Discord)'},
            { name: '2️⃣ Le respect', value: 'Vous devez respecter les autres membres'},
            { name: '3️⃣ Pub', value: 'Tu ne dois pas faire de pub (en mp non plus). Si tu veux faire une demande de partenariat, le channel <#1091261839674986506> est disponnible.'},
            { name: '4️⃣ Bonne foi', value: 'Ne joues pas avec le règlement si une règle n\'est pas inscrite dedans, tu dois faire preuve de bonne foi.'},
            { name: '5️⃣ NSFW', value: 'Aucun contenu explicite n\'est accepté.'},
            { name: '6️⃣ DM', value: 'Ne vas pas harceler les staffs pour une question, le channel <#1091261839674986506> est disponnible pour toutes tes demandes.'},
        )
        .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1091343673410715748/reglement-interieur-entreprise.png")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId("reglementfr")
            .setLabel("Accepter")
            .setStyle(Discord.ButtonStyle.Primary)
            .setEmoji("✅")
    );

await message.reply({ embeds: [Embed], components: [row] });

    }
}