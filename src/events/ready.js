const { Events, ActivityType } = require("discord.js");
const { startYoutubePolling } = require("../youtubeChecker");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    // Confirming in the console that the bot is indeed online
    console.log(`✅ ${client.user.tag} is online.`);

    // Setting up bot status
    client.user.setActivity({
      name: "RetroSocket",
      type: ActivityType.Watching,
    });

    startYoutubePolling(client);
  },
};
