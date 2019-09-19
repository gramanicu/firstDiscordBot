import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class Template implements IBotCommand {
    private readonly command = "template";

    public help(): string {
        // The description of the command
        return "";
    }

    public isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this.command;
    }

    public async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // Delte the command message
        msgObject.delete(0);
    }
}