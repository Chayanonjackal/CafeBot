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
const schema = require("./schema");
const Schema = require("./schema");

require("dotenv").config();

const coffeeMakerChanel = process.env.COFFEE_MAKER

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
        .get(coffeeMakerChanel)
        .send({ embeds: [orderEmbed] });
        if(messageCut.indexOf(" ") === 0){
          setTimeout(async () => {
            let cutSpace = messageCut.replace(" ","");
            await new Schema({
              channelId: message.channelId,
              guildId: message.guildId,
              id: message.id,
              content: cutSpace,
              userId: message.author.id,
              username: message.author.username,
              discriminator: message.author.discriminator,
              avatar: message.author.avatar,
              displayAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
            }).save();
          }, 1000);
        }else{
          setTimeout(async () => {
            await new Schema({
              channelId: message.channelId,
              guildId: message.guildId,
              id: message.id,
              content: messageCut,
              userId: message.author.id,
              username: message.author.username,
              discriminator: message.author.discriminator,
              avatar: message.author.avatar,
              displayAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
            }).save();
          }, 1000);
        }

      
    }

    //for coffe maker
    if (message.channelId === coffeeMakerChanel) {
      if (message.content.indexOf(";ol") === 0) {
        // console.log("=======================");
        Schema.find({}, (error, data) => {
          if (error) {
            console.log(error);
          } else {
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
        if (messageCut.indexOf(" ") === 0) {
          // userInfo(messageCut)
          let messageOifCut = messageCut.replace(" ", "");
          console.log(messageOifCut);
          Schema.find({ username: messageOifCut }, (error, data) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                // let messageOrderCut = data[i].content.replace(";order", "");
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
                    { name: "Order", value: data[i].content },
                    { name: "\u200B", value: "\u200B" }
                  )
                  .setTimestamp();
                message.channel.send({ embeds: [infoEmbed] });
              }
            }
          });
        }
       
      }

      //CancleOrder
      if (message.content.indexOf(";dl") === 0) {
        const messageCut = message.content.replace(";dl","")
        if (messageCut.indexOf(" ") === 0) {
          const messageSpaceCut = messageCut.replace(" ","")
          schema.find( { content: messageSpaceCut  } , (err,data) => {
              if (err) {
                console.log(err);
              }else{
                console.log(data);
                for (let index = 0; index < data.length; index++) {
                   message.channel.send(`Delete Order <${data[index].content}> from <${data[index].username}> already`)
                   
                  }
                  schema.find( { content: messageSpaceCut  } , () => {} ).remove();
                  
              }
          })
        }
      }
    }


  }
});


function userInfo(messageCut) {
  let messageOifCut = messageCut.replace(" ", "");
  Schema.find({ name: messageOifCut }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      for (let i = 0; i < data.length; i++) {
        // let messageOrderCut = data[i].content.replace(";order", "");
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
            { name: "Order", value: data[i].content },
            { name: "\u200B", value: "\u200B" }
          )
          .setTimestamp();
        message.channel.send({ embeds: [infoEmbed] });
      }
    }
  });
  
}

client.login(process.env.TOKEN);
