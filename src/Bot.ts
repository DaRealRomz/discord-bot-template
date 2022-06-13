import { REST } from "@discordjs/rest";
import { Routes, Snowflake } from "discord-api-types/v10";
import { Client, ClientOptions, Collection, Interaction, MessageEmbed, MessageEmbedOptions } from "discord.js";
import log from "npmlog";
import { Command } from "./commands/Command";

export class Bot extends Client {
  public readonly commands: Collection<string, Command>;

  public constructor(options: ClientOptions, commands?: Iterable<Command>) {
    super(options);
    this.commands = new Collection(Object.values(commands ?? []).map((command) => [command.name, command]));
    this.on("interactionCreate", this.onInteractionCreate);
    this.on("ready", this.onReady);
  }

  private async onInteractionCreate(interaction: Interaction): Promise<void> {
    if (interaction.isCommand()) {
      const reply = (...args: Parameters<typeof interaction.reply>): ReturnType<typeof interaction.reply> =>
        interaction.reply(...args).catch((err) => log.error("command", "failed to reply to interaction:", "\n", err));

      const command = this.commands.get(interaction.commandName);
      if (command) {
        log.info("command", "running command:", command.name);
        try {
          await command.execute(interaction, this);
        } catch (err) {
          reply({ embeds: [Bot.errorEmbed("An error occured during command execution.")], ephemeral: true });
          log.error("command", "command execution failed:", command.name + ":", "\n", err, "\n", interaction);
        }
      } else {
        reply({ embeds: [Bot.errorEmbed("This command does not exist!")], ephemeral: true });
        log.warn("command", "unknown command recieved:", interaction.commandName, "\n", interaction);
      }
    }
  }

  private async onReady(): Promise<void> {
    log.info("bot", "ready");
    log.info("bot", `connected as ${this.user?.tag} (${this.user?.id})`);

    if (process.env.NODE_ENV === "development") {
      if (process.env.DEVELOPMENT_GUILD_ID) {
        log.info("bot", "updating development guild commands");
        try {
          await this.deployDevGuildCommands();
          log.info("bot", "updated development guild commands");
        } catch (err) {
          log.error("bot", "failed to update development guild commands:", "\n", err);
        }
      } else {
        log.warn(
          "bot",
          "the DEVELOPMENT_GUILD_ID environment variable is not set\n",
          "guild commands will not be set for the development guild",
        );
      }
    }
  }

  private async deployDevGuildCommands(): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(this.token as string);
    const route = Routes.applicationGuildCommands(
      this.user?.id as Snowflake,
      process.env.DEVELOPMENT_GUILD_ID as Snowflake,
    );
    await rest.put(route, { body: this.commands.mapValues((command) => command.toJSON()) });
  }

  private static errorEmbed(description = "An error occured!", data: Partial<MessageEmbedOptions> = {}): MessageEmbed {
    return new MessageEmbed({ title: "Error", description, color: 0xff0000, ...data });
  }
}
