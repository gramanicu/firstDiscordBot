import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { music }  from "../index"
import * as ytdl from 'ytdl-core'

export default class Template implements IBotCommand {
    private readonly command = "play";

    public help(): string {
        // The description of the command
        return "Plays a specified song";
    }

    public isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this.command;
    }

    public async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // Delete the command message
        msgObject.delete(0);

        // If the song to be played wasn't specified
        if (args.length < 1) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but specify the song`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(process.stdout.write);
                });
            return;
        }

        // If the user is not in a voice channel
        if(!msgObject.member.voiceChannel) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but you must be in a voice channel to hear the music`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(process.stdout.write);
                });
            return;
        }

        // If the bot is not in a voice channel, join one
        if(!msgObject.guild.voiceConnection) {
            msgObject.member.voiceChannel.join()
                .then(connection => {
                    const stream = ytdl(args[0], {filter: "audio"});
                    const dispatcher = connection.playStream(stream);
                    dispatcher.on(`end`, () => connection.disconnect());
                    // music.play(connection, args[0]);
                })
                .catch(process.stdout.write)
        }
    }
}