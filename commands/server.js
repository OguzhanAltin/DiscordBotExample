const { SlashCommandBuilder, User } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sunucu')
    .setDescription('Sunucu hakkinda bilgi verir.'),
  async execute(interaction) {
    await interaction.reply(
      `Bu sunucunun adi **${interaction.guild.name}** ve **${interaction.guild.memberCount}** üyeye sahip.`
    );
  },
};
