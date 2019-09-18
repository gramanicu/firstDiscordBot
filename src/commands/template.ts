import * as Discord from "discord.js"
import { IBotCommand } from "../api";

export default class template implements IBotCommand {
    private readonly _command = "template"

    help(): string {
        // The description of the command
        return "";
    }

    isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this._command;
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    }


}