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

const BOT_CHANNEL ="1093540186853474397"

client.on(Events.MessageCreate, (message)=>{
    if(message.author.bot) return
    if(message.channel.id !== BOT_CHANNEL) return

    console.log(message.content)
})

