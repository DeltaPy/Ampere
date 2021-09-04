const Discord = require('discord.js')
const client = new Discord.Client()
const { Player } = require("discord-player");

const config = require('./config.json')
const command = require('./command.js')
// Music commands
const play = require('./commands/music/play.js')
const pause = require('./commands/music/pause.js')
const resume = require('./commands/music/resume.js')
const skip = require('./commands/music/skip.js')
const clearQueue = require('./commands/music/clearQueue.js')

// init discord-player
const player = new Player(client);
client.player = player;
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
          { name: `${config.prefix}ping`, value: 'Pong!', inline: true },
          { name: `${config.prefix}help`, value: 'This help message', inline: true },
          { name: `${config.prefix}servers`, value: 'Bot server info', inline: true },
          { name: `${config.prefix}clearchannel`, value: 'Clears channel Admin only!', inline: true },
          { name: `${config.prefix}play`, value: 'Plays music from youtube', inline: true },
          { name: `${config.prefix}pause`, value: 'Pauses playing music', inline: true },
          { name: `${config.prefix}resume`, value: 'Resumes paused music', inline: true },
          { name: `${config.prefix}skip`, value: 'Skips playing music', inline: true },
          { name: `${config.prefix}clear, clearqueue`, value: 'Clears music queue', inline: true },
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
  command(client, ['play'], message => {
    const args = message.content.slice(config.prefix.length + 5)
    
    if (!args == '') {
      play(client, message, args)
    } else {
      message.channel.send('Please enter a song title or an URL.')
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

  command(client, ['clearqueue', 'clear'], message => {
    clearQueue(client, message)
  })

})


client.login(config.token)
