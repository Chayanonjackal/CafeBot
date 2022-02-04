const { Embed } = require("@discordjs/builders");
const { Client, Intents, MessageEmbed, Channel, TextChannel } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
// const channel = new Channel({
//     intents: 3
// })
const config = require("./config.json");
const exampleEmbed = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("Some title")
  .setURL("https://discord.js.org/")
  .setAuthor({
    name: "Some name",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
    url: "https://discord.js.org",
  })
  .setDescription("Some description here")
  .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true }
  )
  .addField("Inline field title", "Some value here", true)
  .setImage("https://i.imgur.com/AfFp7pu.png")
  .setTimestamp()
  .setFooter({
    text: "Some footer text here",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
  });

client.once("ready", () => {
  console.log("i'm ready");
  client.user.setActivity("Ready to serve", {
    type: "PLAYING",
  });
  
});

client.on("messageCreate", (message) => {
  //when message have ; in side
  if (message.content.indexOf(";") === 0) {
    // console.log(`Message: ${message}`);
    if (message.content.indexOf(";order") === 0) {
        let messageCut = message.content.replace(";order", "");
        if(messageCut === null || messageCut === undefined){
             messageCut = 'test'   
         }
    //   let messageCut1 = messageCut.content.replace(" ", "");
    //   console.log(messageCut1);
    
      // const orderEmbed = new MessageEmbed()
      // .setColor('#0099ff')
      // .setTitle(`Order from ${message.author}`)
      // .setAuthor({ name: `${message.author}`, iconURL: `${message.iconURL}`, url: 'https://discord.js.org' })
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
        //   {
        //     name: "Inline field title",
        //     value: "Some value here",
        //     inline: true,
        //   },
        //   { name: "Inline field title", value: "Some value here", inline: true }
        )
        // .addField("Inline field title", "Some value here", true)
        // .setImage("https://i.imgur.com/AfFp7pu.png")
        .setTimestamp()
        // .setFooter({
        //   text: "Some footer text here",
        //   iconURL: "https://i.imgur.com/AfFp7pu.png",
        // });

      message.channel.send({ embeds: [orderEmbed] });
      console.log(message.channel.id);
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

client.login(config.token);

// if(message.content === 'ping'){
//     message.reply({
//         content: 'pong'
//     })
// }
