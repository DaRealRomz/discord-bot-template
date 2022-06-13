import { CacheType, CommandInteraction } from "discord.js";
import { Command } from "./Command";

export class Ping extends Command {
  constructor() {
    super("ping", "Replies with pong!");
  }

  public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    await interaction.reply("Pong!");
  }
}
