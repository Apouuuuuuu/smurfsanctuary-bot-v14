const Discord = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const config = require("../config")
const configuration = new Configuration({
    apiKey: `${config.openaikey}`,
});

module.exports = {

    name: "chat-gpt",
    description: "Demandez quelque chose à Chat GPT",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    ownerOnly: false,
    category: "🤖・Intelligence Artificielle",
    options: [
        {
            type: "string",
            name: "prompt",
            description: "Ta demande",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "role",
            description: "Le rôle que tu veux que ChatGPT aie",
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {
        let prompt = args.getString("prompt")
        if(!prompt) return message.reply("Pas de prompt")

        let role = args.getString("role")
        if(!role) role = "user"

        await message.deferReply()
         const openai = new OpenAIApi(configuration)        
        try {
            const chatGPT = async (prompt2) => {
                const response = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: role, content: prompt2 }]
                })
                //console.log(response["data"]["choices"][0]["message"]["content"])
                let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle("Votre question")
                .setDescription(`\`\`\`${prompt}\`\`\``)
                .addFields({name: `La réponse de ChatGPT: `, value : `\`\`\`${(response["data"]["choices"][0]["message"]["content"])}\`\`\``})
                .setThumbnail()
                //.setFooter({ iconURL: `${config.botAvatar}`, text:"ParadiseBOT"})
 await message.followUp({embeds: [Embed]})
            }
            chatGPT(prompt)
            } catch (error) {
              console.error(error);
              message.followUp('Désolé, je n\'ai pas pu répondre à votre question.')
            }}}