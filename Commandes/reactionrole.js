const { EmbedAssertions } = require("discord.js")
const Discord = require("discord.js")

module.exports = {

    name: "reactionrole",
    description: "Envoie le reaction role",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    ownerOnly: false,
    dm: false,
    category: "🔰・Modération",
    options: [],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req) => {

            let roles = req[0].reactionrole.split(" ")
            if(roles.length <= 0) return message.reply("Pas de rôle")

            let options = [];
            for(let i = 0; i < roles.length; i++) {
                let role = message.guild.roles.cache.get(roles[i])
                if(!role) return;
                await options.push({label: `@${role.name}`, value: role.id})
            }

            let Embed = new Discord.EmbedBuilder()
            .setColor("#9250bb")
            .setTitle(`Bienvenu sur le role reaction`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Ici vous pourrez choisir vos qui ont été ajouté par votre cher Administrateur! Merci d'éviter de faire crash le bot !`)
            .setTimestamp()
            .setFooter({text: "Role reaction"})

            const menu = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
            .setCustomId("reactionrole")
            .setMinValues(0)
            .setMaxValues(roles.length)
            .setPlaceholder("Sélectionnez vos rôles")
            .addOptions(options))

            await message.reply({embeds: [Embed], components: [menu]})
        })
    }
}