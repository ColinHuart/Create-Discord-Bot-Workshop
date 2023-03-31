const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Affiche une photo dans le salon de discussion."),

  async execute(interaction) {
    // Envoyer une photo dans le salon de discussion
    interaction.reply({
      files: ["https://media.giphy.com/media/UVah1k9VydwNC4RdOT/giphy.gif"],
    });
  },
};
