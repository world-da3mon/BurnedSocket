const levelManager = require('./levelmanager');
const LEVEL_UP_CHANNEL_ID = '1394076112073789500';

module.exports = {
  name: 'messageCreate',
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
        const rolesToRemove = member.roles.cache.filter(r => allLevelRoles.includes(r.id));
        await member.roles.remove(rolesToRemove).catch(() => {});
        await member.roles.add(newRoleId).catch(() => {});
      }

      const channel = message.guild.channels.cache.get(LEVEL_UP_CHANNEL_ID);
      if (channel) {
        channel.send(`🎉 ${message.author.username} is now level ${level} !`);
      }
    }
  }
};
