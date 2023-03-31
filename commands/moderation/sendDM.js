const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("send a DM")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to DM")
        .setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    await member.send("you have been dmed");
    await interaction.reply({
      content: `Sent a DM to ${member.user.username}`,
      ephemeral: true,
    });
  },
};
