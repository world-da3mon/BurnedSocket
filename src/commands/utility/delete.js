const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Deletes the last [insert number] messages in a channel.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messges to delete")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    interactionUser = interaction.member;
    hasPermissions = interactionUser.roles.cache.has("1393678029716455556");

    if (!hasPermissions) return;
    interactionChannel = interaction.channel;
    const channelMessages = await interactionChannel.messages.fetch();
    const amount = interaction.options.getInteger("amount");

    messagesToDelete = channelMessages.first(amount);
    await interactionChannel.bulkDelete(messagesToDelete, true);

    await interaction.editReply(`🗑️ ${amount} messages successfully deleted.`);
  },
};
