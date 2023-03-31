const fs = require("node:fsnode");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const { log } = require("node:console");
const schedule = require("node-schedule");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
  ],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}
//to if its working
client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

//NOTIF ON DATE
client.on("ready", () => {
  console.log("Je suis prêt !");

  const job1 = schedule.scheduleJob("0 12 * * *", () => {
    const channel = client.channels.cache.get("1087115364711792773");
    channel.send("Ceci est un message envoyé tous les jours à midi !");
  });
});
//RESPONSE ON CREATE
client.on("messageCreate", (message) => {
  console.log(message.content);

  if (message.content.toLowerCase() == "bonjour") {
    message.reply("🖕");
  }
  if (message.content.toLowerCase() == "bot") {
    message.reply("C'est celui qui le dit qu'il l'est");
  }
  if (message.content.toLowerCase() == "quoi") {
    message.reply("FEUR!!!");
  }
});

// Envoyer un message tous les jours à 15 heures
client.on("ready", () => {
  const job2 = schedule.scheduleJob("35 14 * * *", () => {
    const channel = client.channels.cache.get("1087115364711792773");
    channel.send("Ceci est un message envoyé tous les jours à 15 heures !");
  });
});

//MESSAGE WHEN SOMEONE IS ADDED
client.on("guildMemberAdd", (member) => {
  console.log("ici");
  console.log(member);
  console.log("là");
  console.log(member.id);
  const message = `Aye yo<@${member.id}> How did you get here`;
  const channel = member.guild.channels.cache.get("1091081415082385468");
  channel.send(message);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
//console.log(process.env.DISCORD_TOKEN);
client.login(token);
