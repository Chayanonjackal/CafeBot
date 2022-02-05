const { Embed } = require("@discordjs/builders");
const { Client, Intents, MessageEmbed, Channel, TextChannel } = require("discord.js");
require('dotenv').config();
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const config = require("./config.json");



client.once("ready", () => {
  console.log("i'm ready");
  client.user.setActivity("Ready to serve", {
    type: "PLAYING",
  });
  
});

client.on("messageCreate",(message) => {
  //when message have ; in side
  if (message.content.indexOf(";") === 0) {
      //when nothing to order
    if (message.content.indexOf(";order") === 0) {
        let messageCut = message.content.replace(";order", "");
        if(messageCut === null || messageCut === undefined || messageCut === '' || messageCut === ' '){
             messageCut = 'nothing'   
                message.react('🤔')
                message.channel.send(`${message.author} Please inpur ;order yourOrder `)
                return console.log("no input order");
         }

      const orderEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Order from ${message.author.username}`)
        // .setURL("https://discord.js.org/")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL({dynamic: true})}`,
        //   url: "https://discord.js.org",
        })
        // .setDescription("Some description here")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .addFields(
          { name: "Order", value: messageCut },
          { name: "\u200B", value: "\u200B" },
        )
        .setTimestamp()
      message.channel.send({ embeds: [orderEmbed] });
    //   console.log(message.channel.id); form get chanal message
      client.channels.cache.get("939129176835915808").send({ embeds: [orderEmbed] })
      

    }
    // message.reply({
    //     content: 'call me?'
    // })
    // message.react('🤔')
    // message.channel.send(`${message.author} Hi what do u want? `)
    // message.channel.send(`Hello <@${message.author.id}>`)
    // message.channel.send({ embeds: [exampleEmbed] });
  }
});

// client.login(config.token);
client.login(process.env.TOKEN);


