const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")

module.exports = {
    
    name: "rank",
    description: "Donne l'exp d'un joueur",
    commandUsage: "!ban",
    permission: "Aucune",
    dm: false,
    category: "👁️‍🗨️・Expérience",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "l'ex du membre à voir",
            required: false,
            autocomplete: false

        },

    ],


    async run(bot, message, args, db) {

        let user;
        if(args.getUser("utilisateur")) {
            user = args.getUser("utilisateur")
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("Pas de membre !")

        } else user = message.user; 

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => { 

            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, all) => {

            if(req.length < 1) return message.reply("Ce membre n'a pas d'xp !")
            
            await message.deferReply()

            const calculXp = (xp, level) => {    
                xptotal = 0;
                for(let i = 0; i < level; i++) xptotal += parseInt((level + 1) * 1000)
                xptotal += xp;
                return xptotal;
            }

            all = await all.sort(async (a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(b.level)))
            let xp = parseInt(req[0].xp)
            let level = parseInt(req[0].level)
            let rank = all.findIndex(r => r.user === user.id) + 1

            let need = (level + 1) * 1000;
            let Card = await new Canvas.Card()
            .setBackground("https://cdn.discordapp.com/attachments/1085509113678675968/1088102358518608022/generic.png")
            .setBot(bot)
            .setColorFont("#ffffff")
            .setRank(rank)
            .setUser(user)
            .setColorProgressBar("#ff0000")
            .setGuild(message.guild)
            .setXp(xp)
            .setLevel(level)
            .setXpNeed(need)
            .toCard()

            await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
        })

        })
        }

    
    }