const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poop")
    .setDescription("Poop on a member")
    .addMentionableOption((option) =>
      option
        .setName("member")
        .setDescription("The member to poop on.")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    if (!interaction.member.roles.cache.has("1393625676350885938")) {
      await interaction.editReply(
        "You do not have the required permissions to run this command."
      );
    } else {
      const target = interaction.options.getMember("member");
      const poopRoleId = "1393986240407277761";
      const isPoop = target.roles.cache.has(poopRoleId);

      if (isPoop) {
        target.roles.remove(poopRoleId);

        await interaction.editReply(`You have unpooped <@${target.id}>.`);
      } else {
        target.roles.add(poopRoleId);

        await interaction.editReply(`You have pooped <@${target.id}>.`);
      }
    }
  },
};
