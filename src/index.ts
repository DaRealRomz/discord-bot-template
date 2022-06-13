import { Intents } from "discord.js";
import log from "npmlog";
import { Bot } from "./Bot";
import * as commands from "./commands";

if (!process.env.DISCORD_TOKEN) {
  log.error("bot", "the DISCORD_TOKEN environment variable is not set");
  process.exit(1);
}

const bot = new Bot(
  { intents: [Intents.FLAGS.GUILDS] },
  Object.values(commands).map((Command) => new Command()),
);

log.info("bot", "logging in");
bot
  .login(process.env.DISCORD_TOKEN)
  .then(() => log.info("bot", "logged in"))
  .catch((err) => {
    log.error("bot", "failed to login:", "\n", err);
    process.exit(1);
  });
