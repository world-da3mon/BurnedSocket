const {
  Events,
  MessageFlags,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

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
          parent: "1393630162221924382",
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

        const ticketChannelEmbed = new EmbedBuilder()
          .setTitle("End ticket")
          .setDescription(
            "Click on the button below when the problem has been solved."
          )
          .setColor("Blue");

        const row = new ActionRowBuilder();
        const endButton = new ButtonBuilder()
          .setLabel("End")
          .setCustomId("404")
          .setEmoji("🔒")
          .setStyle(ButtonStyle.Danger);

        row.components.push(endButton);

        const embedToPin = await ticketChannel.send({
          embeds: [ticketChannelEmbed],
          components: [row],
        });
        await embedToPin.pin();

        await interaction.editReply(
          `A private channel has been created for you at <#${ticketChannel.id}>.`
        );
      }

      if (interaction.customId === "404") {
        await interaction.channel.delete();
      }
    }
  },
};
