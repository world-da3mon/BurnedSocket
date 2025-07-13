const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the top 10 users with the highest level and XP.'),

  async execute(interaction) {
    const rawData = fs.readFileSync(path.join(__dirname, '../../data/levels.json'));
    const levels = JSON.parse(rawData);

    const sorted = Object.entries(levels)
      .sort((a, b) => (b[1].level * 100 + b[1].xp) - (a[1].level * 100 + a[1].xp))
      .slice(0, 10);

    const leaderboard = await Promise.all(sorted.map(async ([userId, data], i) => {
      try {
        const user = await interaction.client.users.fetch(userId);
        return `**#${i + 1}** - ${user.username} : Level ${data.level} | ${data.xp} XP`;
      } catch {
        return `**#${i + 1}** - Unknown User : Level ${data.level} | ${data.xp} XP`;
      }
    }));

    await interaction.reply({
      content: leaderboard.join('\n'),
      ephemeral: false,
    });
  }
};
