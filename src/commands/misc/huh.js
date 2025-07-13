const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("huh")
    .setDescription("Sends the 'Huh' cat meme."),
  async execute(interaction) {
    await interaction.reply(
      "https://tenor.com/view/huh-cat-huh-m4rtin-huh-huh-meme-what-cat-gif-5834484041415217257"
    );
  },
};
