const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    channelId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    discriminator:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    displayAvatarURL:{
        type: String,
        required: true
    },

})
//channelId '894076239604756532',
//guildId '894076237939613716',
//id  '939399491411386379',
//   content: ';order j',
// author: User {
//     id: '420256668497084417',
//     username: 'Reagan',
//     discriminator: '8889',
//     avatar: 'c0ea14517023492e21d61a2b3231439f',
//   },

module.exports = mongoose.model("queue",schema,"queue")
 