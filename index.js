const Discord = require("discord.js");

const createCredentials = async(token, callback) => {
  const client = new Discord.Client();
  await client.login(token);
  await client.once('ready', () => callback);
  return client
}

//HELLO IM FINALLY HERE AHHHHHHHHHH
//Im making custom functions, each for one block
//kk
//wanna looka t discord api and create more custom functions


const initMessageListener = async(client, callback) => {
  client.on('message', msg => callback(msg, client))
}

const waitThenDo = async(inputFunc, time) => {
  setTimeout(inputFunc(), time*1000)
}

const emojify = async(word, client) => {
  return client;
}

//sending is one time
const sendMessage = async(channel, msg) => {
  channel.send(msg)
  return msg
}

const replyToMessage = async(msg, reply) => {
  msg.reply(reply)
}


const kickUser = async(user, errChannel, client) => {
  if (user) {
    try {
      await user.kick(user);
    } catch(err) {
      sendMessage(errChannel, "I do not have permissions to kick user id: " + user);
    }
  }
}

const initDisconnectListener = async(client, callback, msg) => {
  console.log('gg')
  client.once('disconnect', () => {sendMessage(msg, "disconnect"); console.log('disconnect')})
}

const log1 = (log) => {
  console.log(log.content)
  return (log.content)
}


//our bot
let counter = 0;
createCredentials(token here, console.log("created")).then(client => {
  initMessageListener(client, function(msg, client) {
    if(msg.content.toLowerCase().includes("needy") && msg.content !== "Dont Call Me NEEDY!!"){
      sendMessage(msg.channel, "Dont Call Me NEEDY!!")
      //kickUser(msg.author.id, msg.channel, client)      
    }
    else if (msg.content === '!introduction'){
      sendMessage(msg.channel, 'Hello fellow potato gang i am a bot created my people with big brains. Please worship our god the potatoe or TO THE GUILLOTINE. Boohoo, Lu Bu, died. (Lu Bu speaking) dude... SO uncool.');
    }
    else if (msg.content.toLowerCase().includes("dude, uncool") && msg.content !== "Who you callin uncool. This is a hate free zone dude. Dude, uncool"){
      sendMessage(msg.channel, 'Who you callin uncool. This is a hate free zone dude. Dude, uncool');
    }  
    else if (msg.content.toLowerCase().includes("!spam") && counter <= 10){
      sendMessage(msg.channel, 'I DON"T SPAM! U SPAM!SPAM! STOP SPAMMING');
      counter += 1
    } 
    else if (msg.content.toLowerCase().includes("!spam") && counter >= 10){
      sendMessage(msg.channel, 'I cant spam no more. Plz stop asking');
    }
    else if (msg.content === "!disconnect"){
      initDisconnectListener(client, null, msg.channel);
    }
    else if (msg.content === "!emojify") {
      sendMessage(msg.channel, emojify("yoylecake", client))
    }
    else if (msg.content.startsWith("!kick ")){
      if (msg.member.hasPermission("KICK_MEMBERS")) { 
        try{
          kickUser(msg.mentions.members.first(), msg.channel, client)
        }
        catch(err){
          sendMessage(msg.channel, `You shall'nt kick those more powerful than you, including ${msg.mentions.members.first()}`)
        }
      }
      else {
        console.log('dfd')
        sendMessage(msg.channel, `You can't kick ${msg.mentions.members.first()}. He's too powerful for you!`)
      }
    }
  })
})
