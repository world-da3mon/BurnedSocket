const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    const msgcontent = message.content.toLowerCase();

    // Lil easter egg
    if (msgcontent == "error 404") {
      message.reply("Message not found");
    }

    // For your dumbass
    if (msgcontent.content === "Huh?") {
      if (message.author.id == "802840391161872405") {
        message.reply("Huh?");
      }
    }
  },
};
