const Discord = require("discord.js")
const config = require("../config")
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});

module.exports = {

    name: "imagine",
    description: "Générer un image via une intelligence artificielle.",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "🤖・Intelligence Artificielle",
    options: [
        {
            type: "string",
            name: "prompt",
            description: "Le sujet de l'image",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let prompt = args.getString("prompt")
        if(!prompt) return message.reply("Pas de prompt")
        await message.deferReply()

        const openai = new OpenAIApi(configuration);
        try {
            const response = await openai.createImage({
                "model": "image-alpha-001",
                "prompt": prompt,
                "num_images": 1,
                "size": "1024x1024"
            });
            
            

            let Embed = new Discord.EmbedBuilder()
            .setColor("#ff000")
            .setTitle("Imagine")
            .setDescription(`${message.user}\`\`\`${prompt}\`\`\``)
            .setImage(`${response.data.data[0].url}`)
            .setThumbnail()
           // .setFooter({ iconURL:"L'ICONE DE VOTRE BOT", text:"LE NOM DE VOTRE BOT", }); 
            
    
           await message.followUp({embeds: [Embed]})

        } catch(err) {
            console.log(err)
        }
    }
}