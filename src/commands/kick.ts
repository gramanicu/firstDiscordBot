import * as Discord from "discord.js"
import { IBotCommand } from "../api";

export default class kick implements IBotCommand {
    private readonly _command = "kick"

    help(): string {
        // Command description
        return "Kick mentioned user";
    }

    isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // The command will kick the user mentioned
        // Will only kick the first user if more than one are mentioned

        let mentionedUser = msgObject.mentions.users.first();
        const suppliedReason = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username}: ${suppliedReason}`;

        // Delete the command
        msgObject.delete()
            .catch(console.error);

        // Checks if that user can use the bot to kick other people
        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, but you can't kick other users`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(console.error);
                });
            return;
        }

        // Check's if a user was specified
        if (!mentionedUser) {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, I couldn't find that user`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(console.error);        
                });
            return;
        }

        // Kicks the user
        msgObject.guild.member(mentionedUser).kick(kickLog)
            .catch(console.error);
    }


}