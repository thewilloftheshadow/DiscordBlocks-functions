cconst Discord = require("discord.js");

const createCredentials = async(token, callback) => {
  const client = new Discord.Client();
  await client.login(token);
  await client.once('ready', () => callback);
  return client
}


const embedMessage = (title, channel, description, color) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(description);

  channel.send(embed);
}

const initMessageListener = async(client, callback) => {
  client.on('message', msg => callback(msg, client))
}

const waitThenDo = async(inputFunc, time) => {
  setTimeout(inputFunc(), time*1000)
}

const customEmoji = async(guild, name) => {
  //console.log(guild.emojis.cache.find(ident => ident.name === name))
  return guild.emojis.cache.find(ident => ident.name=name).toString()
}

//sending is one time
const sendMessage = async(channel, msg) => {
  channel.send(msg)
  return msg
}

const replyToMessage = async(msg, reply) => {
  msg.reply(reply)
}

const initGuildJoinListener = (client, callback) => {
  client.on('guildMemberAdd', member => callback(member))
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

