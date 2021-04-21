require(`dotenv`).config();

const tmi = require('tmi.js');

//^start of string with `!command my-arguement`
const regexpCommand = new RegExp(/^![a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    website: {
        response: `https:/twitter.com/ZombieKookie`
    },
    upvote: {
        repsonse: (user) => `User ${user} was upvoted.`
    }
}

const client = new tmi.Client({
	connection: { reconnect: true },
    identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_0AUTH_TOKEN
	},
	channels: [ 'ZombieAutomaton' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME;

    //if it is the bot, just return out. 
    if ( !isNotBot) return; 
        
    //checking string message for if it contains the commandvalues
    const [raw, command, argumet] = message.match(regexCommand);

    const { response } = commands[comman] || {};

    if ( typeof response === `function` ) {
        client.say(channel, response(tags.username));
    }else if ( typeof response === `string` ) {
        client.say(channel, reponse);
    }

    // if ( command ) {
    //     client.say(channel, `Command ${command} found with argument ${argument}`);

    // }

	console.log(`${tags['display-name']}: ${message}`);
});