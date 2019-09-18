import * as Discord from "discord.js"
import { IBotCommand } from "../api";

export default class vote implements IBotCommand {
    private readonly _command = "vote"

    help(): string {
        // The description of the command
        return "Creates a basic vote";
    }

    isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // The vote duration
        const timeout = 10000;
        msgObject.delete(0);

        if (args.length < 1) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but you must supply a vote topic`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(console.error);        
                });
            return;
        }

        // Create a new vote embed
        let voteEmbed = new Discord.RichEmbed()
            .setTitle("Vote")
            .setDescription(args.join(" "))

        // Wait untill the message is sent
        let voteMessage = await msgObject.channel.send(voteEmbed);

        // Add the reaction for the vote
        await (voteMessage as Discord.Message).react("✅");
        await (voteMessage as Discord.Message).react("❎");

        // Filter to count only the "Yes" and "No" reactions
        const filter = (reaction: Discord.MessageReaction) => reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

        // Wait for the specified amount of time the vote results
        const results = await (voteMessage as Discord.Message).awaitReactions(filter, { time: timeout })

        // Create a embed with the vote results
        let resultsEmbed = new Discord.RichEmbed()
            .setTitle("Vote Results")
            .setDescription(`Results For The vote: ${args.join(" ")}`)
            .addField("✅:", `${results.get("✅") ? results.get("✅").count - 1 : 0} Votes`)
            .addField("❎:", `${results.get("❎") ? results.get("❎").count - 1 : 0} Votes`)

        // Send the vote results
        msgObject.channel.send(resultsEmbed);

        // Delete the vote "poll"
        (voteMessage as Discord.Message).delete(0);
    }


}