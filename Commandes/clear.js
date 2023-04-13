const Discord = require("discord.js")

module.exports = {

    name: "clear",
    description: "Effacer entre 0 et 100 messages",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "🔰・Modération",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nom de message a supprimer",
            required: true,
            autocomplete: false
        }, {
            type: "channel",
            name: "salon",
            description: "Le salon ou effacer les messages",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if (!channel) channel = message.channel;
        if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon")

        let number = args.getNumber("nombre")
        if (parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il nous faut un nombre entre `0` et `100` inclus !")

        await message.deferReply()

        try {

            let messages = await channel.bulkDelete(parseInt(number))



            let EmbedSupprime = new Discord.EmbedBuilder()
                .setColor(bot.colorModeration)
                .setTitle("Clear")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`\`${messages.size}\` messages ont été suppprimés dans le salon ${channel}.`)
                .setTimestamp()
                .setFooter({ text: "Clear footer" })

            const sentMessage = await message.channel.send({ embeds: [EmbedSupprime] });

            // supprime l'embed après 5 secondes
            setTimeout(() => {
                sentMessage.delete();
            }, 5000);



        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if (messages.length <= 0) return message.followUp("Aucun message à supprimer car ils datent tous de plus de 14 jours !")
            await channel.bulkDelete(messages)


            let Embed = new Discord.EmbedBuilder()
                .setColor('Red')
                .setTitle("Clear")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`J'ai pu supprimé uniquement \`${messages.length}\` message(s), car les autres dataient de plus de 14 jours !`)
                .setTimestamp()
                .setFooter({ text: "Clear footer" })

            const sentMessage = await message.channel.send({ embeds: [Embed] });

            // supprime l'embed après 5 secondes
            setTimeout(() => {
                sentMessage.delete();
            }, 5000);


        }
    }
}