const tmi = require('tmi.js');
const fetch = require('node-fetch');
const fs = require('fs');
// Users that can use certain bot commands
var whitelist = ['hey_jase', 'doomercreatine']
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'botcreatine',
    password: process.env.apiKey
  },
  channels: [ 'doomercreatine' ]
});

client.connect();

// Declare the global variables needed for guess logging
var logging_guess = false;
var current_guesses = {};
var current_counts = 0;

// Print out information on room joined
client.on("roomstate", (channel, state) => {
  console.log(`Joined channel: ${channel}\nBot name: ${client.getUsername()}`);
});

client.on('chat', (channel, tags, message, self) => {
  if(message.startsWith('?')) {
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
  
    if(whitelist.includes(tags.username.toLowerCase())) {
      if (command === 'botcheck') {
        client.say(channel, `/me is online and running @${tags.username} POGGIES`)
      } else if(command === 'start' && !logging_guess) {        
        get_userlist();
        current_guesses = {};
        logging_guess = true;
        console.log(logging_guess);
        
      } else if(command === 'end'){
        // Handle ending the guesses
        console.log(current_guesses);
      } else if(command === 'winner') {
        // Handle choosing a winner
        let casket_val = parseInt(args[0]);
        console.log(casket_val);
      }
    } 
  } else {
    if(logging_guess){
      console.log("Message received");
      // log guesses
      current_guesses[tags.username.toLowerCase()] = message;
    }
  }  
});


// Fetch current userlist so we can filter out names
function get_userlist() {
  let url = "https://tmi.twitch.tv/group/user/hey_jase/chatters";
  
  
  async function getData() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  }
  
  const userlist = (async () => { const data = await getData(); return data })()
  userlist.then(function(result) {
      var users = [];
      users = users.concat(result['chatters']['moderators'], result['chatters']['viewers']);
      fs.writeFile("./current_users.json", JSON.stringify(users), function(err) {
          if(err) {
                console.log(err);
          } 
          else {
            console.log("Output saved to current_users.json");
          }
        });
  });
}
