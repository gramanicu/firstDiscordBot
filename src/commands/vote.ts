import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class Vote implements IBotCommand {
    private readonly command: string = "vote";

    public help(): string {
        // The description of the command
        return "Creates a basic vote";
    }

    public isThisCommand(command: string): boolean {
        // Checks if the string is actually this command
        return command === this.command;
    }

    public async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        // The vote duration
        const timeout = 10000;
        msgObject.delete(0);

        if (args.length < 1) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but you must supply a vote topic`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(process.stdout.write);
                });
            return;
        }

        // Create a new vote embed
        const voteEmbed = new Discord.RichEmbed()
            .setTitle("Vote")
            .setDescription(args.join(" "));

        // Wait untill the message is sent
        const voteMessage = await msgObject.channel.send(voteEmbed);

        // Add the reaction for the vote
        await (voteMessage as Discord.Message).react("✅");
        await (voteMessage as Discord.Message).react("❎");

        // Filter to count only the "Yes" and "No" reactions
        const filter = (reaction: Discord.MessageReaction) => reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

        // Wait for the specified amount of time the vote results
        const results = await (voteMessage as Discord.Message).awaitReactions(filter, { time: timeout });

        const initialVoteCount = 0;

        // Create a embed with the vote results
        const resultsEmbed = new Discord.RichEmbed()
            .setTitle("Vote Results")
            .setDescription(`Results For The vote: ${args.join(" ")}`)
            .addField("✅:", `${results.get("✅") ? results.get("✅").count - 1 : initialVoteCount} Votes`)
            .addField("❎:", `${results.get("❎") ? results.get("❎").count - 1 : initialVoteCount} Votes`);

        // Send the vote results
        msgObject.channel.send(resultsEmbed);

        // Delete the vote "poll"
        (voteMessage as Discord.Message).delete(0);
    }


}