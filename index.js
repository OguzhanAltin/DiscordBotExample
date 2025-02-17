require('dotenv').config();
const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Reading Commands Files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[UYARI] ${filePath} adresindeki komutta gerekli bir "data" veya "execute" özelliği eksik.`
    );
  }
}

//Reading Event Files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);

// Start Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
