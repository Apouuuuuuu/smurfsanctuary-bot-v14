const Discord = require("discord.js");

module.exports = {
  name: "reroll",
  description: "Choisir un nouveau gagnant pour le giveaway",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Modération",
  options : [
    {
        name : "messageid",
        type: "string",
        description : "L'id du giveaway",
        required: true,
        autocomplete: false
    },
    {
        name : "winnerscount",
        type: "integer",
        description : "Le nombre de winners",
        required: true,
        autocomplete: false
    }
  ],
  async run(bot, interaction, args) {
    let messageId = args.getString("messageid"); // L'ID du message de giveaway
    let winnersCount = args.getInteger("winnerscount"); // Le nombre de gagnants

    let message = await interaction.channel.messages.fetch(messageId);
    let reactions = message.reactions.cache.get("🎉").users.cache.filter((user) => !user.bot);

    if (reactions.size <= winnersCount) {
      const errorEmbed = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`Il n'y a pas assez de participants pour choisir un nouveau gagnant.`);

      return await interaction.reply({ embeds: [errorEmbed] });
    }

    const newWinners = reactions.random(winnersCount);
    const newWinnersList = newWinners.map((user) => `<@${user.id}>`).join(", ");

    const successEmbed = new Discord.EmbedBuilder()
      .setColor("#36ff00")
      .setDescription(`Félicitations ${newWinnersList} ! Vous êtes les nouveaux gagnants !`);

    await interaction.reply({ embeds: [successEmbed] });
  },
};
