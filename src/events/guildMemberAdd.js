const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    // Welcomer
    const welcomeChannel = await member.guild.channels.cache.get(
      "1393627778196308151"
    );

    welcomeChannel.send(
      `>>> 👋 Welcome to **\\\\\\\\Retro Socket//** 💾
<@${member.user.id}>, thanks to you, we have reached ${member.guild.memberCount} members!
You're now plugged into the most nostalgic terminal on the internet.

Here, we worship the command line, revive dusty machines, meme about BSODs, and argue over the best Linux distro (it's obviously not Ubuntu... or is it? 👀)

💡 New here?
• Head over to <#1393626733835452578> to get the vibe
• And most importantly... **don’t rm -rf /**

Let’s get nerdy. 🐧`
    );

    // Auto-adding the Noobuntu role
    await member.roles.add("1257827366785384479");
  },
};
