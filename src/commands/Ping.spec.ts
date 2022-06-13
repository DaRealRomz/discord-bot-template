import { CommandInteraction } from "discord.js";
import { Ping } from "./Ping";

describe("ping command", () => {
  it("should reply with pong", async () => {
    const command = new Ping();
    const interaction = { reply: jest.fn() };
    await command.execute(interaction as unknown as CommandInteraction);
    expect(interaction.reply).toHaveBeenCalledTimes(1);
    expect(interaction.reply).toHaveBeenCalledWith("Pong!");
  });
});
