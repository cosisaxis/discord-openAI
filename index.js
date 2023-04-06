const {Client, Events, GatewayIntentBits} = require("discord.js");
require("dotenv/config")

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once(Events.ClientReady, (clientUser) => {
    console.log(`We are now in ${clientUser.user.tag}`)
})

client.login(process.env.BOT_TOKEN)