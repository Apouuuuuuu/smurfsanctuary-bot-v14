const Discord = require("discord.js")

module.exports = {

    name: "tariffr",
    description: "Envoit l'embed du tarif français",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "🔰・Modération",
    options: [],

    async run(bot, message, args) {

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.colorUtile)
        .setTitle("Tarifs")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Tarifs des différents services")
        .addFields(
            { name: '<:leagueoflegends:1092428088173932654> **__League of Legends__**', value: ' ' },
            { name: '<:unranked:1092466987533340753> Compte unranked lvl 30 1 skin au choix', value: '4€'},
            { name: '<:unranked:1092466987533340753> Compte unranked lvl 30 2 skin au choix', value: '5€'},
            { name: '<:ironlol:1092429545979777095> Compte iron 4', value: '25€'},
            { name: '<:goldlol:1092429535212998726> Compte gold', value: '10€'},
            { name: '<:platlol:1092429540845953086> Compte platine', value: '24€'},
            { name: '<:diamondlol:1092429533598195742> Compte plat', value: '45€'},  
            { name: '<:valorant:1092458404137681048> **__Valorant__**', value: ' ' },
            { name: '<:valoplatinum3:1092386589004537946> Compte platine', value: '14€'},  
            { name: '<:valodiamond3:1092386593882525796> Compte diamant', value: '14€'},  
            { name: '<:valoascendant3:1092386586047557662> Compte ascendant', value: '14€'},
            { name: '<:shoppingcart:1092385345078820924> **__Tu veux acheter ?__**', value: '<#1091261839674986506>'},  
        )
        .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1092465554448711730/image.png")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        await message.reply({embeds: [Embed]})
    }
}