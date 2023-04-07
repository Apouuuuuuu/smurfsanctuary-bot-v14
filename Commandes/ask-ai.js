const Discord = require("discord.js")
const config = require("../config")
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: `${config.openaikey}`,
});

module.exports = {

    name: "ask-ai",
    description: "Demande quelque chose à GPT-3",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "🤖・Intelligence Artificielle",
    options: [
        {
            type: "string",
            name: "prompt",
            description: "Ta demande",
            required: true,
            autocomplete: false
        }

    ],

    async run(bot, message, args) {

        let prompt = args.getString("prompt")
        if(!prompt) return message.reply("Pas de prompt")
        await message.deferReply()

        const openai = new OpenAIApi(configuration);
        try{

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.9,
                max_tokens: 1000,
            });



            if (response.data.choices[0].text.trim() !== '') {
                let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle("Ask-AI")
                .setDescription(`\`\`\`${prompt}\`\`\``)
                .addFields({name: `Votre réponse: `, value : `\`\`\`${response.data.choices[0].text}\`\`\``})
                .setThumbnail()
                //.setFooter({ iconURL:"L'ICONE DE VOTRE BOT", text:"NomBotTest", });
                message.followUp({embeds: [Embed]});
            }

        } catch(err) {console.log(err)}
        }}