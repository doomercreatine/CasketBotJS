// RegEx expression to parse messages for the numeric guess
var guess_reg = new RegExp('(?<![\/\\aAcCdDeEfFgGhHiIjJlLnNoOpPqQrRsStTuUvVwWxXyYzZ])[0-9\s,.]+(?![\/\\aAcCdDeEfFgGhHiIjJlLnNoOpPqQrRsStTuUvVwWxXyYzZ]+\b)\s*[,.]*[kKmMbB]{0,1}\s*[0-9]*');
var handle_red = new RegExp('([@#][A-Za-z0-9_]+)|(\w+:\/\/\S+)');
function extract_guess(guess) {
    var match;
    var res = [];
    match = reg.exec(guess);
    if (match) {
        return match[0];
    } else {
        return null;
    }
}
const fetch = require('node-fetch');
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
    console.log(users);
});