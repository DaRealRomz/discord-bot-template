import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client, ClientUser } from "discord.js";
import log from "npmlog";
import * as commands from "../commands";

const client = new Client({ intents: [] });
client.once("ready", () => {
  const { tag, id } = client.user as ClientUser;

  log.info("bot", `connected as ${tag} (${id})`);
  log.info("bot", "updating commands...");

  new REST({ version: "10" })
    .setToken(client.token as string)
    .put(Routes.applicationCommands(id), { body: Object.values(commands).map((Command) => new Command().toJSON()) })
    .then(() => log.ingo("bot", "updated commands"))
    .catch((err) => {
      log.error("bot", "failed to update commands:", "\n", err);
      process.exit(1);
    })
    .finally(() => client.destroy());
});

log.info("bot", "loggin in...");
client
  .login(process.env.DISCORD_TOKEN)
  .then(() => log.info("bot", "logged in"))
  .catch((err) => {
    log.error("bot", "failed to login:", "\n", err);
    process.exit(1);
  });
