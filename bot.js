const Discord = require('discord.js');
const client = new Discord.Client();
const random = require('random');
const prefix = process.env.prefix;
const token = process.env.token;
const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send();

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.login(token);

  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const msg = message.channel;


    console.log(message.content);

    if (message.content === '!ping') {
      // send back "Pong." to the channel the message was sent in
      msg.send('Pong.');
    }

    else if(command === 'roll') {
      if(!args[0]) {
        const result = random.int(min = 1, max = 20);
        if(result === 1) critFail(1);
        else if(result === 20) natty(20);
        else {msg.send(result)};
      }
      else if(args[0] && !args[1]) {
        const result = random.int(min =1, max = parseInt(args[0]));
        if(result === 1) critFail(1);
        else if(result === 20) natty(20);
        // msg.send(result);
      }
      else if (args[1] === 'plus' || args[1] ==="+"){
        const rand = random.int(min =1, max = parseInt(args[0]));
        const add = parseInt(args[2]);
        const result =  rand + add;
        if(rand === 1 && args[0] === 20) critFail(result);
        else if(rand === 20 && args[0] === 20) natty(result);
        else {
          console.log(rand);
          console.log(add);
          msg.send(result);
        }
      }
      else if (args[1] === 'minus'|| args[1] ==="-"){
        const rand = random.int(min =1, max = parseInt(args[0]));
        const sub = parseInt(args[2]);
        const result =  rand - sub;
        if(rand === 1 && args[0] === 20) critFail(result);
        else if(rand === 20 && args[0] === 20) natty(result);
        else{
          console.log(rand);
          console.log(sub);
          msg.send(result);
        }
      }
    }
    function critFail(result) {
      msg.send("A Critical Failure!\nhttps://www.youtube.com/watch?v=CQeezCdF4mk Your total is: " + result)
    }

    function natty(result){
      msg.send("Natural 20! \nhttps://www.youtube.com/watch?v=dn5Tattkj_E\nYour total is: " + result)
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port 3000");
});
