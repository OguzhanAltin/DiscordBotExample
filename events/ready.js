const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: false,
  execute(client) {
    console.log(`Hazir! ${client.user.tag} olarak giris yapti.`);
    client.user.setPresence({
      activities: [{ name: `MAVZY`, type: ActivityType.Watching }],
      status: 'dnd',
    });
  },
};
