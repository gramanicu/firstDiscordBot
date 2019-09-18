import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

client.on("ready", () => {
    // Set the bot's activity
    client.user.setActivity("Papa Pewds", {type: "WATCHING"});
})

client.on("message", msg => {
    // Ignore the message if it was sent by the bot
    if(msg.author.bot) { return; }

    // Ignore direct messages
    if(msg.channel.type == "dm") { return; }

    // Ignore messages that don't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    // Handle the command
    handleCommand(msg);
})

async function handleCommand(msg: Discord.Message) {
    // Split the string into the command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    // Loop through all the loaded commands
    for(const commandClass of commands) {
        // Attempt to execute code
        try {
            // Check if the command is valid
            if(!commandClass.isThisCommand(command)) {
                // Go to the next iteration if not
                continue;
            }

            // Pause execution while running the command
            await commandClass.runCommand(args, msg, client);
        } catch(exception) {
            // If there is an error, log it
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string) {
    // Exit if there are no config file or no commands
    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    // Loop through all of the commands in our config file
    for(const commandName of ConfigFile.config.commands as string[]) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass() as IBotCommand;

        commands.push(command);
    }
}

// Login the bot into the server
client.login(ConfigFile.config.token);