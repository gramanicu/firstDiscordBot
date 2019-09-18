import * as Discord from "discord.js";
import * as ConfigFile from "./config";

const client: Discord.Client = new Discord.Client();

client.on("ready", () => {
    // Let us know that the bot is online
    console.log("Ready to go!");
})

client.on("message", msg => {
    // Ignore the message if it was sent by the bot
    if(msg.author.bot) {
        return;
    }

    // Ignore messages that don't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }

    msg.channel.send(`${msg.author.username} just used a command !`);
})

client.login(ConfigFile.config.token);