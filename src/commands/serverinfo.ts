import * as Discord from "discord.js"
import { IBotCommand } from "../api";

export default class serverinfo implements IBotCommand {
    private readonly _command = "serverinfo"

    public help(): string {
        // The description of the command
        return "Gives a bit of server info";
    }

    isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // Delete the command
        msgObject.delete()
            .catch(console.error);

        // Create a new embed with server info
        let embed = new Discord.RichEmbed()
                        .setColor([0, 255, 0])
                        .setTitle("Server Info")
                        .setFooter("This is pretty cool")
                        .setImage(client.user.avatarURL)
                        .setDescription("Welcome to our Server !")
                        .addField("Server Count:", `Our server currently has ${msgObject.guild.memberCount} members!`);
        
        // Send the embed
        msgObject.channel.send(embed)
            .catch(console.error);
    }


}