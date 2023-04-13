const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Expulse un membre du serveur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "🔰・Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à expulser",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison de l'expulsion",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

            let user = args.getUser("membre")
            if(!user) return message.reply("Pas de membre à expulser !")
            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("Le membre n'est pas sur le serveur !")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return message.reply("Ne t'expulse pas toi même !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("N'expulse pas le propriétaire du serveur !")
            if(member && !member.kickable) return message.reply("Je ne peux pas expulser ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas expulser ce membre !")

            try {await user.send(`Tu as été exclu du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a exclu ${user.tag} pour la raison : \`${reason}\``)

            await member.kick(reason)
    }
}