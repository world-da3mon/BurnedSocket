const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const levelManager = require("../../leveling/levelmanager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Display your current XP and Level."),

  async execute(interaction) {
    const userId = interaction.user.id;
    const data = levelManager.getUserLevelData(userId);

    if (!data) {
      return await interaction.reply({
        content: `⚠️ No data found for you yet. Try sending some messages first!`,
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.reply({
      content: `🧪 You are level **${data.level}** with **${data.xp} XP**.`,
    });
  },
};
