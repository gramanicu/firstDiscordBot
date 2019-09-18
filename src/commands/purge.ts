import * as Discord from "discord.js"
import { IBotCommand } from "../api";

export default class purge implements IBotCommand {
    private readonly _command = "purge"

    help(): string {
        // The description of the command
        return "(Admin Only) Deletes the specified number of the messages from the channel";
    }

    isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this._command;
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        // Delete the command from the channel
        msgObject.delete();

        // Make sure that the person using the command is an Admin
        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but this command is only for Admins`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        // Make sure that they have said how many messages to delete
        if(!args[0]) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but you must supply a number of messages to be deleted`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        // Convert the argument to a number
        let numberOfMessages = Number(args[0]);

        // Checks if the argument was a number
        if(numberOfMessages == NaN) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but that isn't a valid number`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        numberOfMessages = Math.round(numberOfMessages);

        // Deletes the desired number of messages
        msgObject.channel.bulkDelete(numberOfMessages)
            .catch(console.error);

    }


}