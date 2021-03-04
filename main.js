// Node modules import
const Discord = require("discord.js");
const fs = require("fs");
const { join } = require("path");
const { Manager } = require("erela.js");

// Variables
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Initiate the Manager with some options and listen to some events.
client.manager = new Manager({
  nodes: [
    { host: 'localhost', port: 80, password: 'youshellnotpass' }, //FOR NOW USE LOCAL LAVALINK
    //{ host: 'URL', port: PORT, password: 'PASSWORD' }, //Lavalink node 1
    //{ host: 'URL', port: PORT, password: 'PASSWORD' }, //Lavalink node 2
  ],
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
  .on("playerMove", (player, oldChannel, newChannel) => if (!newChannel) player.destroy());

client.once("ready", () => {
  console.log("Bot ready!");
  client.manager.init(client.user.id);

  //BOT STATUS SETTING
  client.user.setPresence({
    status: "online",
    activity: {
      name: "e!help",
      type: "LISTENING"
    }
  });
  
  setInterval(() => {
    //Automatic presence renew
    client.user.setPresence({
      status: "online",
      activity: {
        name: "e!help",
        type: "LISTENING"
      }
    });
  }, 43200000);
});

const commandFiles = fs.readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  if (command.help) client.commands.set(command.help.name, command);
}

client.on("message", async message => {
  try {
    message.content = message.content.replace(/\s+/g, ' ').trim();
    if (message.author.bot) return;

    let prefix = "e!"
    var serverQueue = client.manager.players.get(message.guild.id);

    if (!message.content.startsWith(prefix)) return;

    message.content = message.content.substring(prefix.length);

    const command = client.commands.get(message.content.split(' ')[0]) || client.commands.find((cmd) => cmd.help.aliases && cmd.help.aliases.includes(message.content.split(' ')[0]));

    if (!command) return;
    if (command.requirements.ownerOnly && message.author.id !== 123456789) return message.channel.send('This command is for owner only...'); //set you're Discord ID instead of 123456789
    if (command.requirements.userConnection && !message.member.voice.channel) return message.channel.send("You have to be in a voice channel to use this command");

    await command.run(message, prefix, serverQueue, client); //PUT YOUR VARIABLES HERE
  }
  catch (error) {
    console.log("Error: " + error);
  }
});

client.on("raw", (d) => client.manager.updateVoiceState(d));

// Start bot
client.login("BOT_TOKEN_HERE").catch(error => console.error(error.stack || error));
