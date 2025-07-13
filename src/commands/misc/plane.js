const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { apiKey } = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("plane")
    .setDescription("Sends a plane image"),
  async execute(interaction) {
    await interaction.deferReply();

    const res = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: "airplane",
        image_type: "photo",
        safesearch: true,
        per_page: 50,
      },
    });

    const hits = res.data.hits;
    if (!hits || hits.length === 0) {
      return await interaction.editReply(
        "No airplane images available at the moment 😢"
      );
    }

    const randomImage = hits[Math.floor(Math.random() * hits.length)];

    await interaction.editReply({
      content: `Here is your airplane image, freshly stolen from Pixabay.`,
      files: [randomImage.largeImageURL],
    });
  },
};
