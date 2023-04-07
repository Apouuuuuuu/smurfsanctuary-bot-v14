const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Empêche un membre de parler",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🔰・Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps du mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("Aucun membre a mute !!");
        let member = message.guild.members.cache.get(user.id);
        if(!member) return message.reply("Le membre n'existe pas dans ton serveur !!");
        
        let time = args.getString("temps");
        if(!time) return message.reply("Tu n'a pas mis de temps !!")
        if(isNaN(ms(time))) return message.reply("Le temps n'est pas au bon format !!")
        if(ms(time) > 86400000) return message.reply("Le mute ne peux pas durer plus de 28 jours !!")
  
        let reason = args.getString("raison");
        if(!reason) reason = "Pas de raison donnée !!";
  
        if(message.user.id === user.id) return message.reply("Tu ne peux pas te mute toi meme !!");
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peux pas mute le proprietaire du serveur !!")
        if(!member.moderatable) return message.reply("Je n'ai pas le droit de mute ce membre !!");
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas mute se membre !!")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est deja mute !!")
       
        try {await user.send(`Tu as été mute du serveur : ${message.guild.name} par : ${message.user.tag} pendant : ${time} ppur la raison : \`${reason}\` !!`)} catch(err) {}
            
            await message.reply(`${message.user} a mute ${user.tag} pendant ${time} pour la raison \`${reason}\` !!`)
          
            await member.timeout(ms(time), reason)
      }
  }