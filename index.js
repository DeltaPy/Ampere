require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { Player } = require("discord-player");

const config = require('./config.js')

let prefix = process.env.PREFIX
const command = require('./command.js')
// Music commands
const play = require('./commands/music/play.js')
const pause = require('./commands/music/pause.js')
const resume = require('./commands/music/resume.js')
const skip = require('./commands/music/skip.js')
const clearQueue = require('./commands/music/clearQueue.js')
const loop = require('./commands/music/loop.js')
const disconnect = require('./commands/music/disconnect.js')
const filter = require('./commands/music/filter.js')

// init discord-player
const player = new Player(client)
client.config = config
client.player = player
client.filters = client.config.filters
// event handlers
client.player.on("trackStart", (message, track) => message.channel.send(`🎵 - Now playing **${track.title}**!`))
client.player.on("trackAdd", (message, queue) => message.channel.send(`🎶 - **${queue.tracks[queue.tracks.length - 1].title}** has ben added to the queue.`))
client.player.on("queueEnd", (message) => message.channel.send(`😞 - The queue has ended!`))


client.once('ready', () => {
  console.log(`Client is ready and logged as ${client.user.username}`)
  client.user.setActivity('-help', { type: 'PLAYING' })

  command(client, 'ping', message => {
    message.channel.send('Pong!')
  })

  command(client, 'help', message => {
    message.channel.send({
      embed: {
        color: 'BLUE',
        fields: [
          { name: `${prefix}ping`, value: 'Pong!', inline: true },
          { name: `${prefix}help`, value: 'This help message', inline: true },
          { name: `${prefix}servers`, value: 'Bot server info', inline: true },
          { name: `${prefix}clearchannel`, value: 'Clears channel Admin only!', inline: true },
          { name: `${prefix}play, p`, value: 'Plays music from youtube', inline: true },
          { name: `${prefix}pause`, value: 'Pauses playing music', inline: true },
          { name: `${prefix}resume`, value: 'Resumes paused music', inline: true },
          { name: `${prefix}skip`, value: 'Skips playing music', inline: true },
          { name: `${prefix}loop, repeat`, value: 'Repeats playing music or queue', inline: true },
          { name: `${prefix}disconnect, stop`, value: 'Stops music and disconnects bot', inline: true },
          { name: `${prefix}clear, clearqueue`, value: 'Clears music queue', inline: true },
          { name: `${prefix}filter`, value: `Adds a filter to playing song **Buggy** (Examples: ${client.filters.map((x) => '`' + x + '`').join(', ')})`, inline: true },
        ]
      }
    }
  )})

  command(client, 'servers', message => {
    client.guilds.cache.forEach(guild => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members.`
        )
    })
  })

  command(client, ['clearchannel'], message => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch()
      .then(results => {
        message.channel.bulkDelete(results, true)
      })
    }
  })
  // ~~~~~~~~~~~~ Music commands ~~~~~~~~~~~~
  command(client, ['play', 'p'], message => {
    const args = message.content.split(/(?<=^\S+)\s/)
    
    if (!args[1]) {
      return message.channel.send('Please enter a song title or an URL.')
    } else {
      play(client, message, args[1])
    } 
  })

  command(client, ['pause'], message => {
    pause(client, message)
  })
  
  command(client, ['resume'], message => {
    resume(client, message)
  })

  command(client, ['skip'], message => {
    skip(client, message)
  })

  command(client, ['loop','repeat'], message => {
    const args = message.content.split(/(?<=^\S+)\s/)
    if (args[1] == undefined || args[1] === 'queue') {
      loop(client, message, args)
    } else {
      return message.channel.send(`Please enter a valid repeat mode (Example: ${prefix}loop queue)`)
    } 
  })

  command(client, ['clearqueue', 'clear'], message => {
    clearQueue(client, message)
  })

  command(client, ['disconnect', 'stop'], message => {
    disconnect(client, message)
  })

  command(client, ['filter'], message => {
    const args = message.content.split(/(?<=^\S+)\s/)
    if(!args[1]) return message.channel.send('🤔 - Please specify a valid filter to enable or disable!')
    filter(client, message, args[1])
  })

})


client.login(process.env.TOKEN)
