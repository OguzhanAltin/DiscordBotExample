require('dotenv').config();
const { REST, Routes, ClientVoiceManager } = require('discord.js');
const fs = require('node:fs');

const commands = [];

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(
      `${commands.length} uygulama (/) komutları yenilenmeye başlandı.`
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );

    console.log(`${data.length} uygulama (/) komutlari basariyla yenilendi.`);
  } catch (error) {
    console.error(error);
  }
})();
