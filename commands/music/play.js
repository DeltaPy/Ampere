const yts = require('yt-search')

module.exports = async (client, message, args) => {
    const results = await yts(args)
    const videos = results.videos.slice( 0, 1 )

    // check before action
    if(!message.member.voice.channel) return message.channel.send('😔 - You are not in a voice channel.')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('🤔 - The bot is in another voice channel.')

    // try {
    //     if(!client.player.getQueue(message).paused) message.channel.send(`🎶 - **${videos[0].title}** has ben added to the queue.`)
    // } catch{
        try {
            client.player.play(message, String(videos[0].url))
        } catch (e) {
            console.error(e)
            message.channel.send('An unexpected error has occurred!')
        }
    
}
