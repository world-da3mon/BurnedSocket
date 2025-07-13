const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction) {
    if (reaction.partial) {
      await reaction.fetch();
    }

    const reactionMessage = reaction.message;
    if (reactionMessage.channelId == "1393633550342819992") {
      const starReaction = reactionMessage.reactions.cache.get("⭐");

      if (starReaction.count >= 3) {
        const starboardChannel = reactionMessage.guild.channels.cache.get(
          "1393633904987996283"
        );

        const attachments = reactionMessage.attachments
          .map((attachment) => attachment.url)
          .join("\n");

        starboardChannel.send(
          `>>> ## 🌟 A new message on the starboard 🌟 : ${reactionMessage.url}.\n**${reactionMessage.author}**
${reactionMessage.content}
${attachments}`
        );
      }
    }
  },
};
