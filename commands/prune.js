const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sil')
    .setDescription(
      'Discord sinirlamasi oldugu icin 99 mesaja kadar silebiliyoruz 🥹'
    )
    .addIntegerOption((option) =>
      option.setName('miktar').setDescription('Silinecek mesaj miktari')
    ),
  async execute(interaction) {
    if (interaction.user.id === process.env.DISCORD_OWNER_ID) {
      const amount = interaction.options.getInteger('miktar');

      if (amount < 1 || amount > 99) {
        return interaction.reply({
          content: '**1 veya 99 arasinda bir sayi girmeniz lazim.**',
          ephemeral: true,
        });
      }
      await interaction.channel.bulkDelete(amount, true).catch((error) => {
        console.error(error);
        interaction.reply({
          content:
            '**Bu kanaldaki mesajları ayıklamaya çalışırken bir hata oluştu!**',
          ephemeral: true,
        });
      });

      return interaction.reply({
        content: `**${amount} mesaj uzaya firlatildi 😎**`,
        ephemeral: true,
      });
    } else {
      console.log(
        `${interaction.user.tag} tarafindan izinsiz kod denemesi yapildi.`
      );
      await interaction.reply('**Bu komudu kullanmak icin yetkiniz yok.**');
    }
  },
};
