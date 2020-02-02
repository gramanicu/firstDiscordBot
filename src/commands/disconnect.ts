import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { music }  from "../index"

export default class Template implements IBotCommand {
    private readonly command = "disconnect";

    public help(): string {
        // The description of the command
        return "Disconnect the bot from the server (stops the bot)";
    }

    public isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this.command;
    }

    public async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // Delete the command message
        msgObject.delete(0);

        music.stop();
        process.exit(0);
    }
}