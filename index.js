const tmi = require('tmi.js');
// Users that can use certain bot commands
var whitelist = ['hey_jase', 'doomercreatine']
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'botcreatine',
    password: ''
  },
  channels: [ 'doomercreatine' ]
});

client.connect();
/*
client.on('chat', (channel, tags, message, self) => {
  console.log(`${tags['display-name']}: ${message}`);
});
*/


// Declare the global variables needed for guess logging
var logging_guess = false;
var current_guesses = {};
var current_guesses = {};
var current_counts = 0;

client.on('chat', (channel, tags, message, self) => {
  if(self || !message.startsWith('?')) {
    return;
  }

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  console.log(`${args[0]}`)
  if(whitelist.includes(tags.username.toLowerCase())) {
    if (command === 'botcheck') {
      client.say(channel, `/me is online and running @${tags.username} POGGIES`)
    } else if(command === 'start') {
      //client.say(channel, `@${tags.username}, you said: ${args.join(' ')}`);
      if (tags.username.toLowerCase == 'hey_jase' & !logging_guess) {
        logging_guess = true;
        current_guesses = {};
        current_guesses = {};
      }
    }
  } 
});
