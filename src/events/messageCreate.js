const { Events } = require("discord.js");
const levelHandler = require("../leveling/levelhandler");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    const msgcontent = message.content.toLowerCase();

    // Lil easter egg
    if (msgcontent == "error 404") {
      message.reply("Message not found");
    }

    // For your dumbass
    if (message.content === "Huh?") {
      if (message.author.id == "802840391161872405") {
        message.reply("Huh?");
      }
    }

    //lvl shit
    levelHandler.execute(message);
  },
};
