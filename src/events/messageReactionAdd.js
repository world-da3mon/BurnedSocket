const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction) {
    if (reaction.partial) {
      await reaction.fetch();
    }

    const reactionMessage = reaction.message;
    if (reactionMessage.channelId == "1393674489338003584") {
      const starReaction = reactionMessage.reactions.cache.get("⭐");

      if (starReaction.count >= 3) {
        const starboardChannel = reactionMessage.guild.channels.cache.get(
          "1393674458710937611"
        );

        const attachments = reactionMessage.attachments
          .map((attachment) => attachment.url)
          .join("\n");

        starboardChannel.send(
          `>>> ## 🌟 A new message on the starboard 🌟 : ${reactionMessage.url}.
**${reactionMessage.author}**
${reactionMessage.content}
${attachments}`
        );
      }
    }
  },
};
