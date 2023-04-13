const Discord = require("discord.js")

module.exports = {

    name: "reglement",
    description: "Envoit l'embed du règlement",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "🔰・Modération",
    options: [],

    async run(bot, message, args) {

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.colorUtile)
        .setTitle("Règlement")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Les 8 commandements du serveur :")
        .addFields(
            { name: '▶️ Le respect', value: 'Respectueux envers les autres tu seras, sinon la haagrah tu prendras' },
            { name: '▶️ Rôles', value: 'Tes rôles tu choisiras, car sans, SDF tu finiras (trop relou)'},
            { name: '▶️ Pub', value: 'Ta promo tu garderas (on est pas sur la PlayComedyClub)'},
            { name: '▶️ Spam', value: 'Tu ne spammeras pas, car des épileptiques il y a'},
            { name: '▶️ Contenu explicite', value: 'Le contenu NSFW tu ne posteras pas (gros dégueulasse comment ça Hinata hentai ?)'},
            { name: '▶️ Relou', value: 'Le berger allemand tu ne feras pas, car sur Tinder nous ne sommes pas'},
            { name: '▶️ Safe place', value: 'Tout comportement inacceptable tu reporteras (safe place ici)'},
            { name: '▶️ Troll vocal', value: 'es soundboards, voicemod, troll vocal tu éviteras (faisons ça sur TeamSpeak)'},
        )
        .setImage("https://cdn.discordapp.com/attachments/1085999942360911884/1088106684842516590/9F57FDB8-5554-473C-8883-C2EA2D80069A.png")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        await message.reply({embeds: [Embed]})
    }
}