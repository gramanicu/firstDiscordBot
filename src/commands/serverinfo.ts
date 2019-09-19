import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class Serverinfo implements IBotCommand {
    private readonly command = "serverinfo";

    public help(): string {
        // The description of the command
        return "Gives a bit of server info";
    }

    public isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this.command;
    }

    public async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // Delete the command
        msgObject.delete()
            .catch(process.stdout.write);

        // Create a new embed with server info
        const embed = new Discord.RichEmbed()
                        .setColor([0, 255, 0])
                        .setTitle("Server Info")
                        .setFooter("This is pretty cool")
                        .setImage(client.user.avatarURL)
                        .setDescription("Welcome to our Server !")
                        .addField("Server Count:", `Our server currently has ${msgObject.guild.memberCount} members!`);

        // Send the embed
        msgObject.channel.send(embed)
            .catch(process.stdout.write);
    }
}
