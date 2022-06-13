# Discord Bot Template

This is a template for building [Discord.js](https://discord.js.org/) bots.

## Features
This template features:
- [TypeScript](https://www.typescriptlang.org/) (with JS support)
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- Testing with [Jest](https://jestjs.io/)
- Logging with [npmlog](https://github.com/npm/npmlog)
- Modular command files
- Slash commands
- A script to deploy application commands
- Secrets stored in environment variables
- Easy development with [nodemon](https://nodemon.io/) and guild commands that update instantaneously

# Use this template
To use this template, do any of the following:
- [Create a repository from this template](https://github.com/DaRealRomz/discord-bot-template/generate)
- Use the [GitHub CLI](https://cli.github.com/):  
```
gh repo create username/repository -c -p DaRealRomz/discord-bot-template
```
- Use Git:  
```
git clone -b main --single-branch --depth 1 https://github.com/DaRealRomz/discord-bot-template my-discord-bot
rm -rf ./my-discord-bot/.git
```
After creating your project, do not forget to update `package.json` to match your needs.

## Developing your bot
1. [Create your project](#use-this-template)
2. Update `package.json` to match your needs
3. Install dependencies by running `npm install`
4. Create a `.env` file at the root of the repository with the following contents:
```env
DISCORD_TOKEN=<YOUR DISCORD TOKEN>
DEVELOPMENT_GUILD_ID=<YOUR DEVELOPMENT GUILD ID>
NODE_ENV=development
```
`DEVELOPMENT_GUILD_ID` is optional, but, if provided, will be used to update guild commands instantly when you make changes to the code.

5. Run `npm run dev` and start coding!

It is recommended to install plugins for EditorConfig, ESLint and Prettier to your code editor. These plugins will automatically be suggested to you if you use [Visual Studio Code](https://code.visualstudio.com/).

You can also use `npm run lint` or `npm run lint:fix` to run ESLint. Likewise, you can run Prettier by using `npm run prettier` or `npm run prettier:write`. These commands will automatically be run when you do `npm test`.

## Deploying to production
Build your bot with `npm run build` and run it with `npm start`. Do not forget to set `NODE_ENV=production`.

To deploy your commands globally, you can use `npm run deploy-cmds` after you have built the code.
