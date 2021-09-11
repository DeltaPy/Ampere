const yts = require('yt-search')
const ytdl = require('ytdl-core')

module.exports = async (client, message, args) => {
    

    // check before action
    if(!message.member.voice.channel) return message.channel.send('😔 - You are not in a voice channel.')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('🤔 - The bot is in another voice channel.')

    try {
        if(ytdl.validateURL(args)) client.player.play(message, args)
        else {
            const results = await yts(args)
            const videos = results.videos.slice( 0, 1 )
            client.player.play(message, String(videos[0].url))
        }
        
    } catch (e) {
        console.error(e)
        message.channel.send('An unexpected error has occurred!')
    }
    
}
