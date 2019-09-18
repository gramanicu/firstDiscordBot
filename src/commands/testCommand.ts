import * as Discord from "discord.js"
import { IBotCommand } from "../api";

export default class testCommand implements IBotCommand {
    private readonly _command = "testCommand"
    
    help(): string {
        // The description of the command
        return "This command does absolutely nothing XD !";
    }

    isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this._command;
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        // Let us know it all went well!

        msgObject.channel.send("IT WORKED!");
    }


}