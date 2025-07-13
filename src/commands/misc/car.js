const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { apiKey } = require("../../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("car")
    .setDescription("Sends a car image"),
  async execute(interaction) {
    await interaction.deferReply();

    const res = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: "car",
        image_type: "photo",
        safesearch: true,
        per_page: 50,
      },
    });

    const hits = res.data.hits;
    if (!hits || hits.length === 0) {
      return await interaction.editReply(
        "No car images available at the moment 😢"
      );
    }

    const randomImage = hits[Math.floor(Math.random() * hits.length)];

    await interaction.editReply({
      content: `Here is your car image, freshly stolen from Pixabay.`,
      files: [randomImage.largeImageURL],
    });
  },
};
