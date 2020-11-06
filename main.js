// Node modules import
const Discord = require("discord.js");
const bootconfig = require("./config.json");
const fs = require("fs");
const { join } = require("path");
const { Manager } = require("erela.js");

// Variables
const client = new Discord.Client();
// Initiate the Manager with some options and listen to some events.
client.manager = new Manager({
  // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
  nodes: [
    // If you pass a object like so the "host" property is required
    {
      host: bootconfig.lavalink_host,
      port: bootconfig.lavalink_port,
      password: bootconfig.lavalink_password,
    },
  ],
  // A send method to send data to the Discord WebSocket using your library.
  // Getting the shard for the guild and sending the data to the WebSocket.
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`);
  })
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");

    player.destroy();
  })
  .on("playerMove", (player, oldChannel, newChannel) => {
    if (!newChannel) player.destroy();
  });
client.commands = new Discord.Collection();

client.once("ready", () => {
  console.log("Bot ready!");
  client.manager.init(client.user.id);

  //BOT STATUS SETTING
  client.user.setPresence({
    status: "online",
    activity: {
      name: "/help",
      type: "LISTENING"
    }
  });
});

const commandFiles = fs.readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  try {
    message.content = message.content.replace(/\s+/g, ' ').trim();
    if (message.author.bot) return;

    let prefix = "PREFIX_HERE"
    var serverQueue = client.manager.players.get(message.guild.id);

    if (!message.content.startsWith(prefix)) return;

    message.content = message.content.substring(prefix.length);

    const command = client.commands.get(message.content.split(' ')[0]) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(message.content.split(' ')[0]));

    if (!command) return;

    await command.execute(message, prefix, serverQueue, client); //PUT YOUR VARIABLES HERE
  }
  catch (error) {
    console.log("Error: " + error);
  }
});

client.on("raw", (d) => client.manager.updateVoiceState(d));

// Start bot
client.login(bootconfig.token);
