const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Select a member and kick them (but not really).")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    return interaction.reply({
      content: `You wanted to kick: ${member.user.username}`,
      ephemeral: true,
    });
  },
};

// KICK USER
// const member = interaction.options.getMember('target');
// member.kick();

// BAN USER
// const user = interaction.options.getUser('target');
// guild.members.ban(user);
