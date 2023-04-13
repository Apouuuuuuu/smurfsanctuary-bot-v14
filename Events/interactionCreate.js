const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.type ===  Discord.InteractionType.ApplicationCommandAutocomplete) {
        let entry = interaction.options.getFocused()
        
        if(interaction.commandName === "help") {
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }
        if(interaction.commandName === "chat-gpt") {
            let choices = ["system", "user", "assistant"];
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map({name: c, value: c}))
        }
        if(interaction.commandName === "translate") {

            let choices = ["en", "fr"] // + de langues : https://cloud.google.com/translate/docs/languages?hl=fr
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        } 
        if(interaction.commandName === "roles") {
            let choices = ["add", "remove"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }

    if (interaction.isButton()) {
        if(interaction.customId === "ticketAchat") {
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username} - Achat`,
                type: Discord.ChannelType.GuildText
            })
            await channel.setParent(interaction.channel.parent.id)

            
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.permissionOverwrites.create("1091284888801517639", {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            }) 


            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket à bien été crée: ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.colorUtile)
            .setTitle("Ticket créer")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .addFields(
                { name: '<:shoppingcart:1092385345078820924> **__Type de paiement autorisé | Allowed payment type__**', value: '<:paypal:1092384401020698624> Paypal | <:binancelogo:1092411453279060050> Crypto | <:discordcreditcard:1092411454919016448> Carte banquaire'},  
                { name: 'Un staff compétent va arriver.', value: 'En attendant, merci de faire savoir le type d\'offre que vous voulez acheter.'},
            )
            .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1091354338401718362/galochka-otmetka-makro.png")
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})


            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️"))

            channel.send(`<@${interaction.user.id}>`)
            await channel.send({embeds: [Embed], components: [btn]})
            
            
        }


        if(interaction.customId === "ticketPartenariat") {
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username} - Partenariat`,
                type: Discord.ChannelType.GuildText
            })
            await channel.setParent(interaction.channel.parent.id)

            
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.permissionOverwrites.create("1091284888801517639", {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            }) 


            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket à bien été crée: ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.colorUtile)
            .setTitle("Ticket créer")
            .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1091354338401718362/galochka-otmetka-makro.png")
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})


            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️"))

            channel.send(`<@${interaction.user.id}>`)
            await channel.send({embeds: [Embed], components: [btn]})
        }

        if(interaction.customId === "ticketAutre") {
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username} - Autre`,
                type: Discord.ChannelType.GuildText
            })
            await channel.setParent(interaction.channel.parent.id)

            
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.permissionOverwrites.create("1091284888801517639", {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            }) 


            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket à bien été crée: ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.colorUtile)
            .setTitle("Ticket créer")
            .setImage("https://cdn.discordapp.com/attachments/1091340701402411069/1091354338401718362/galochka-otmetka-makro.png")
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})


            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️"))

            channel.send(`<@${interaction.user.id}>`)
            await channel.send({embeds: [Embed], components: [btn]})
        }

        if(interaction.customId === "close") {
            let user = bot.users.cache.get(interaction.channel.topic)
            try {await user.send("Votre ticket à été fermé. \nVoici la retranscription du ticket.")} catch (err) {}
        
            const discordTranscripts = require('discord-html-transcripts');
            
            // or (if using typescript) import * as discordTranscripts from 'discord-html-transcripts';
        
            // Get the channel of the interaction
            const channel = interaction.channel;
        
            const attachment = await discordTranscripts.createTranscript(channel, { // https://www.npmjs.com/package/discord-html-transcripts
                poweredBy: false,
                saveImages: true,
              });
        
            const channelTicket = bot.channels.cache.get('1092501916220657664');
            await channelTicket.send({
                content: `Voici la transcription du ticket de ${user.username} | ${user.id} | <@${user.id}>)) :`,
                files: [attachment],});

            await interaction.user.send({
                files: [attachment],
            });
        
            await interaction.channel.delete();
        }
        

        if (interaction.customId === "english") {
            const roleId = "1091297405728739379"; 
            const role = interaction.guild.roles.cache.get(roleId);
            const member = interaction.member;
        
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({content: `The <@&${role.id}> role has been removed from you.`, ephemeral: true})
            } else {
                await member.roles.add(role);
                await interaction.reply({content: `The <@&${role.id}> role has been added to you.`, ephemeral: true})
            }
        }

        if (interaction.customId === "france") {
            const roleId = "1091297149494513714"; 
            const role = interaction.guild.roles.cache.get(roleId);
            const member = interaction.member;
        
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({content: `Vous vous êtes enlevé le rôle <@&${role.id}>.`, ephemeral: true})
            } else {
                await member.roles.add(role);
                await interaction.reply({content: `Vous vous êtes ajouté le rôle <@&${role.id}>.`, ephemeral: true})
            }
        }

        if (interaction.customId === "reglementfr") {
            const roleId = "1091143162753470526"; 
            const role = interaction.guild.roles.cache.get(roleId);
            const member = interaction.member;
        
            if (member.roles.cache.has(roleId)) {
                await interaction.reply({content: `Tu as déjà accepté le règlement.`, ephemeral: true})
            } else {
                await member.roles.add(role);
                await interaction.reply({content: `Tu viens d'accepter le règlement, le rôle <@&${role.id}> vient de t'être ajouté.`, ephemeral: true})
            }
        }

        if (interaction.customId === "reglementen") {
            const roleId = "1091297004484829244"; 
            const role = interaction.guild.roles.cache.get(roleId);
            const member = interaction.member;
        
            if (member.roles.cache.has(roleId)) {
                await interaction.reply({content: `You have already accepted the rules.`, ephemeral: true})
            } else {
                await member.roles.add(role);
                await interaction.reply({content: `You have just accepted the rules, and the role <@&${role.id}> has been added to you.`, ephemeral: true})
            }
        }
        
    }

    if(interaction.type === 3) {
        if(interaction.customId === "reactionrole") {
            bot.db.query(`SELECT * FROM server WHERE guild = '${interaction.guildId}'`, async (err, req) => {
                let roles = req[0].reactionrole.split(" ")
                if(roles.length <= 0) return;

                await interaction.deferReply({ephemeral: true})

                let retiredroles = [""];
                let addroles = [""];
                for(let i = 0; i < roles.length; i++) {
                    if(interaction.member.roles.cache.has(roles[i])) {
                        interaction.member.roles.remove(roles[i])
                        retiredroles.push(roles[i])
                    }
                    
                }

                for(let i = 0; i < interaction.values.length; i++) {
                    interaction.member.roles.add(interaction.values[i])
                    addroles.push(interaction.values[i])
                }
                await interaction.followUp({content: `${addroles.length <= 0 ? "" : `Rôle(s) ${addroles.map(r => interaction.guild.roles.cache.get(r) ? `\`${interaction.guild.roles.cache.get(r).name}\`` : "").join(" ")} ajouté(s). \n`} ${retiredroles.length <= 0 ? "" : `Role(s)  ${retiredroles.map(r => interaction.guild.roles.cache.get(r) ? `\`${interaction.guild.roles.cache.get(r).name}\`` : "").join(" ")} retiré(s).`}`})

            })
        }
    }
    if (interaction.isCommand()) {
        let EmbedCommandLogs = new Discord.EmbedBuilder()
            .setColor(bot.colorInformation)
            .setTitle("Logs")
            .setDescription(`Commande envoyée`)
            .addFields(
                { name: '▶️ Auteur :', value: `\`\`\`${interaction.user.tag}\`\`\`` },
                { name: '▶️ Contenu :', value: `\`\`\`${interaction.commandName}\`\`\`` },
                { name: '▶️ Channel :', value: `<#${interaction.channel.id}>` },
                )
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
    
        let channel = bot.channels.cache.get('1091377161824378921');
        channel.send({ embeds: [EmbedCommandLogs] });
    }
}    