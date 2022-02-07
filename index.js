const { Embed } = require("@discordjs/builders");
const { error } = require("console");
const {
  Client,
  Intents,
  MessageEmbed,
  Channel,
  TextChannel,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const mongoose = require("mongoose");
const Schema = require("./schema");

require("dotenv").config();

client.on("ready", async () => {
  await mongoose.connect(process.env.MONGO_URI || "", {
    keepAlive: true,
  });

  console.log("i'm ready");
  client.user.setActivity("Ready to serve", {
    type: "PLAYING",
  });
});

client.on("messageCreate", (message) => {
  //when message have ; in side
  if (message.content.indexOf(";") === 0) {
    //when nothing to order
    if (message.content.indexOf(";order") === 0) {
      let messageCut = message.content.replace(";order", "");
      if (
        messageCut === null ||
        messageCut === undefined ||
        messageCut === "" ||
        messageCut === " "
      ) {
        messageCut = "nothing";
        message.react("🤔");
        message.channel.send(
          `${message.author} Please inpur ;order <yourOrder> `
        );
        return console.log("no input order");
      }

      const orderEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Order from ${message.author.username}`)
        // .setAuthor({
        //   name: `${message.author.username}`,
        //   iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
        // })
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .addFields(
          { name: "Order", value: messageCut },
          { name: "\u200B", value: "\u200B" }
        )
        .setTimestamp();
      message.channel.send({ embeds: [orderEmbed] });
      //   console.log(message.channel.id); form get chanal message
      client.channels.cache
        .get("939129176835915808")
        .send({ embeds: [orderEmbed] });

      setTimeout(async () => {
        await new Schema({
          channelId: message.channelId,
          guildId: message.guildId,
          id: message.id,
          content: message.content,
          userId: message.author.id,
          username: message.author.username,
          discriminator: message.author.discriminator,
          avatar: message.author.avatar,
          displayAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
        }).save();
      }, 1000);
    }
    if (message.content.indexOf(";ol") === 0) {
      console.log("=======================");
      Schema.find({}, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          message.channel.send("=========== Order List =============");
          for (let i = 0; i < data.length; i++) {
            message.channel.send(
              `Name : ${data[i].username} , Order : ${data[i].content}`
            );
          }
        }
      });
    }
    //Order Info
    if (message.content.indexOf(";oif") === 0) {
      let messageCut = message.content.replace(";oif", "");
      Schema.find({ name: messageCut }, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            let messageOrderCut = data[i].content.replace(";order", "");
              const infoEmbed = new MessageEmbed()
              .setColor("#0099ff")
            //   .setTitle(`Order info ${data[i].username}`)
              .setAuthor({
                name: `${data[i].username}`,
                iconURL: `${data[i].displayAvatarURL}`,
              })
              .setThumbnail(
                `${data[i].displayAvatarURL}`
                // `dddd`
              )
              .addFields(
                { name: "Order", value: messageOrderCut },
                { name: "\u200B", value: "\u200B" }
              )
              .setTimestamp();
            message.channel.send({ embeds: [infoEmbed] });

              
          }
         
        }
      });
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

client.login(process.env.TOKEN);
