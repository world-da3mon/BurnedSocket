const { Events } = require('discord.js');
const levelManager = require('./levelmanager');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const xp = Math.floor(Math.random() * 11) + 5;
    const userId = message.author.id;

    const { level, leveledUp } = levelManager.addXp(userId, xp);

    if (leveledUp) {
      const member = await message.guild.members.fetch(userId).catch(() => null);
      if (!member) return;

      const newRoleId = levelManager.getRoleForLevel(level);
      const allLevelRoles = levelManager.getAllLevelRoles();

      if (newRoleId) {
        // Retirer anciens rôles de niveau
        const rolesToRemove = member.roles.cache.filter(r => allLevelRoles.includes(r.id));
        await member.roles.remove(rolesToRemove).catch(() => {});
        // Ajouter le nouveau rôle
        await member.roles.add(newRoleId).catch(() => {});
      }

      message.channel.send(`🎉 ${message.author.username} is now at the level ${level} !`);
    }
  }
};
