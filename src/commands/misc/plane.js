const { SlashCommandBuilder } = require("discord.js");
const accessKey = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("plane")
    .setDescription("Sends a plane"),
  async execute(interaction) {
    await interaction.deferReply();
    const response = await fetch(
      `https://api/unsplash.com/photos/random?query=plane&orientation=landscape&client_id=${accessKey}`
    );
    const data = await response.json();

    await interaction.editReply({
      content: `Here's your plane!\nPhoto by [${data.user.name}](${data.user.links.html}) on [Unsplash](https://unsplash.com)`,
      files: [data.urls.regular],
    });
  },
};
