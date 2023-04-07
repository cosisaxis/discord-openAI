# discord-openAI

### I'll be explaining the code that allows my discord bot to work with the openAI API.


```
const {Client, Events, GatewayIntentBits} = require("discord.js");
require("dotenv/config")
const { OpenAIApi, Configuration } = require("openai") 

```
