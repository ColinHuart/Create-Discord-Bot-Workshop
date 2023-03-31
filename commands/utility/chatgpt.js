const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { APIKEY, ORG } = require("../../config.json");

const configuration = new Configuration({
  apiKey: APIKEY,
  organization: ORG,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("Ask chatgpt a question!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("This is going to be the question to chatGpt")
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const option = interaction.options.get("question");
    console.log(option); // log the option object to check its properties

    const question = option.value;

    try {
      const res = await openai.createCompletion({
        model: "davinci",
        max_tokens: 200,
        temperature: 0.5,
        prompt: question,
      });
      await interaction.editReply(`${res.data.choices[0].text}`);
      return;
    } catch (e) {
      console.log(e);
    }
  },
};
