import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { music }  from "../index"

export default class Template implements IBotCommand {
    private readonly command = "skip";

    public help(): string {
        // The description of the command
        return "Skip to the next song";
    }

    public isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this.command;
    }

    public async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // Delete the command message
        msgObject.delete(0);

        // If the user is not in a voice channel
        if(!msgObject.member.voiceChannel) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but you must be in a voice channel to skip the song`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(process.stdout.write);
                });
            return;
        }

        // If the bot is in a voice channel
        if(msgObject.guild.voiceConnection) {
            msgObject.guild.voiceConnection.dispatcher.end();
        }
    }
}