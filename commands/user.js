const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kullanici')
    .setDescription('Kullanici hakkinda bilgi verir.'),
  async execute(interaction) {
    await interaction.reply(
      `Bu komut; discord'a **${interaction.member.joinedAt}** zamaninda katılan **${interaction.user.username}** tarafından çalıştırıldı. `
    );
  },
};
