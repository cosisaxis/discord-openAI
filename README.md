# discord-openAI

### I'll be explaining the code that allows my discord bot to work with the openAI API.

```javascript
const {Client, Events, GatewayIntentBits} = require("discord.js");
require("dotenv/config")
const { OpenAIApi, Configuration } = require("openai") 
```
This code snippet imports the necessary modules for the Discord.js library and the OpenAI API. Client, Events, and GatewayIntentBits are modules from Discord.js that allow the creation of a Discord bot, handle various events that the bot can listen to, and specify which events the bot is interested in listening to. OpenAIApi and Configuration are modules from the OpenAI API that enable the bot to interact with OpenAI models.

```javascript
const config = new Configuration({
    apiKey:process.env.OPEN_AI
})
```
We are essentially creating an object here that was provided by the `Configuration`class from the openAI api to to authenticate the client using the provided API key, which is required to access and use the API.
