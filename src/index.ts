import * as Discord from "discord.js";
import { IBotCommand } from "./api";
import * as ConfigFile from "./config";
import { MusicManager } from "./music-manager"

const client: Discord.Client = new Discord.Client();
const music: MusicManager = new MusicManager();

export { music };

const loadCommands = (commandsPath: string) => {
    const cmds: IBotCommand[] = [];
    
    // Exit if there are no config file or no commands
    if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    // Loop through all of the commands in our config file
    for (const commandName of ConfigFile.config.commands as string[]) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass() as IBotCommand;

        cmds.push(command);
    }

    return cmds;
};

const commands: IBotCommand[] = loadCommands(`${__dirname}/commands`);

client.on("ready", () => {
    // Set the bot's activity
    process.stdout.write("Bot is online!");
    client.user.setActivity("Papa Pewds", {type: "WATCHING"});
});

client.on("guildMemberAdd", (member) => {
    // Displays a welcome message on the specified channel when a new user joins
    const welcomeChannelName = "general";
    const welcomeChannel = member.guild.channels.find((channel) => channel.name
                                === welcomeChannelName) as Discord.TextChannel;
    welcomeChannel.send(`Welcome ${member.displayName}!`);

    // Adds a role to the new member
    const memberRole = member.guild.roles.find((role) => role.id === "623891768362008610");
    member.addRole(memberRole);

    // Sends a DM to the member
    member.send("Thank you for joining our server!");
});

client.on("guildMemberRemove", (member) => {
    const welcomeChannel = member.guild.channels.find((channel) => channel.name === "github") as Discord.TextChannel;
    welcomeChannel.send(`We are sorry that you had to go :( ${member.displayName}!`);
});

client.on("message", (msg) => {
    // Ignore the message if it was sent by the bot
    if (msg.author.bot) { return; }

    // Ignore direct messages
    if (msg.channel.type === "dm") { return; }

    // Ignore messages that don't start with the prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    // Handle the command
    handleCommand(msg);
});

const handleCommand = async(msg: Discord.Message) => {
    // Split the string into the command and all of the args
    const command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    const args = msg.content.split(" ").slice(1);

     // Loop through all the loaded commands
    for (const commandClass of commands) {
        // Attempt to execute code
        try {
            // Check if the command is valid
            if (!commandClass.isThisCommand(command)) {
                // Go to the next iteration if not
                continue;
            }

            // Pause execution while running the command
            await commandClass.runCommand(args, msg, client);
        } catch (exception) {
            // If there is an error, log it
            process.stdout.write(exception);
        }
    }
};

// Login the bot into the server
client.login(process.env.DISCORD_BOT_TOKEN || ConfigFile.config.token);
