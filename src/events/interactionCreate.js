const { Events, MessageFlags, ChannelType } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `❎ No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "⚠️ There was an error while executing this command.",
            flags: MessageFlags.Ephemeral,
          });
        } else {
          await interaction.reply({
            content: "⚠️ There was an error while executing this command.",
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === "256") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const ticketChannel = await interaction.guild.channels.create({
          name: `help-${interaction.user.displayName}`,
          type: ChannelType.GuildText,
          parent: "1393969589901197323",
          reason: `Ticket opened by ${interaction.user.username}`,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: ["ViewChannel", "SendMessages", "AttachFiles"],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ["ViewChannel"],
            },
          ],
        });

        await interaction.editReply(
          `A private channel has been created for you at <#${ticketChannel.id}>.`
        );
      }
    }
  },
};
