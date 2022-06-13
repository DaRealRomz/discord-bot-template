import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { Bot } from "../Bot";

export abstract class Command extends SlashCommandBuilder {
  constructor(name: string, description: string) {
    super();
    this.setName(name);
    this.setDescription(description);
  }

  public abstract execute(interaction: CommandInteraction, bot: Bot): Promise<void>;
}
