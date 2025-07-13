const {
  Events,
  ActivityType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { startYoutubePolling } = require("../youtubeChecker");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    // Confirming in the console that the bot is indeed online
    console.log(`✅ ${client.user.tag} is online.`);

    // Setting up bot status
    client.user.setActivity({
      name: "RetroSocket",
      type: ActivityType.Watching,
    });

    const helpChannel = await client.channels.fetch("1393660518031425587");
    const channelMessages = await helpChannel.messages.fetch();

    if (channelMessages.size === 0) {
      const helpEmbed = new EmbedBuilder()
        .setTitle("Open a ticket")
        .setDescription("Use the button below to open a ticket.")
        .setColor("Blue");

      const row = new ActionRowBuilder();
      const helpButton = new ButtonBuilder()
        .setLabel("Open")
        .setCustomId("256")
        .setEmoji("🎟️")
        .setStyle(ButtonStyle.Secondary);

      row.components.push(helpButton);

      helpChannel.send({ embeds: [helpEmbed], components: [row] });
    }

    startYoutubePolling(client);
  },
};
