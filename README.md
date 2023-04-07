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

```javascript
const openai = new OpenAIApi(config)
```
In the `openai` we are creating a new instance of the `OpenAIApi`using the configuration settings of the config object. This code is essentially providing an interface to interact with the api and the config provided the api key needed to authenticate the responses from said api.

```javascript
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
```
This code is creating a new instance with 3 specific intents. Intents are used to determine which events a client should listen to and receive updates about.  In this case, the client is set to listen to events related to guilds (servers), messages sent in guild channels, and message contents. This means that the bot will only receive updates about these events, and not others, which can help reduce unnecessary data transfer and improve performance.

```javascript
client.once(Events.ClientReady, (clientUser) => {
    console.log(`We are now in ${clientUser.user.tag}`)
})

client.login(process.env.BOT_TOKEN)
```
The first line initializes the discord bot client and the second like authenticates it via the bot token that's hidden in the .env file

```javascript
const BOT_CHANNEL ="1093540186853474397"
const PAST_MESSAGES = 5
```
`BOT_CHANNEL` variable holds the ID of the channel in which the bot should process messages while the `PAST_MESSAGES` variable holds the number of previous messages the bot should fetch and use as context for generating its response.

```javascript
client.on(Events.MessageCreate, async (message)=>{
})
```
This piece of code sets up an event listener for when a message is created in the channel. I'll explain the code inside it below.

```javascript
 if(message.author.bot) return
 if(message.channel.id !== BOT_CHANNEL) return
```
These if statements check if the sender of the message is a bot and if the message is being sent in the right channel.

```javascript
message.channel.sendTyping()
```
`message.channel.sendTyping()` is a method in the Discord.js library that allows the bot to indicate that a message is being typed.

```javascript
 let messages = Array.from(await message.channel.messages.fetch({
        limit:PAST_MESSAGES,
        before:message.id
    }))
```
This code is essentially fetching the past 5 messages(That's the number we provided in the `PAST_MESSAGES` variable earlier) and converting them into an array using the `Array.from()` method which makes it a lot easier to manipulate. `message.channel` is the channel the message was sent in, and message.id is the ID of the current message. limit is the maximum number of messages to fetch. In the end the `messages` variable will consist of the last 5 messages plus the current one.

```javascript
messages = messages.map(m=>m[1])
messages.unshift(message)
```
We are using this piece of code to modify the the `messages` array. `messages = messages.map(m=>m[1])` This code maps the messages array to a new array that contains only the second element of each tuple. `messages.unshift(message)` adds the message object to the the front of the messages array so it essentially includes the most recent messages first.

```javascript

let users =[...new Set([...messages.map(m=> m.member.displayName), client.user.username])]
 let lastUser = users.pop()
let prompt = `Conversation between two parties ${users.join(", ")}, and ${lastUser}. \n\n`
```
We are creating an array of unique users who have sent messages in a conversation. It does this by mapping over the `messages` array and extracting the `displayName` property of the member object of each message. The new Set() function is then used to remove duplicates from the array, and the spread operator ... is used to spread the values into a new array. This array is then assigned to the users variable. `let lastUser = users.pop()` is there to remove and retrieve the last element from the
`users` array and assign it to the `lastUser` variable. `let prompt` = `Conversation between two parties ${users.join(", ")}, and ${lastUser}. \n\n` This prompt variable will return a string that is used to act as a prompt for the OpenAI API to generate a response.





