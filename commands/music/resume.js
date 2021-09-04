module.exports = (client, message) => {

    // check before action
    if(!message.member.voice.channel) return message.channel.send('😔 - You are not in a voice channel!')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('🤔 - The bot is in another voice channel!')


    // check if queue is empty
    if(!client.player.getQueue(message)) return message.channel.send('🤔 - No music is currently playing!')
    if(!client.player.getQueue(message).paused) return message.channel.send('🤔 - The music is already playing!')

    try {
        // Resume doesn't work if this sh*t isnt done :/
        client.player.resume(message)
        client.player.pause(message)
        client.player.resume(message)
        return message.channel.send(`▶️ - **${client.player.getQueue(message).playing.title}** resumed!`)
    } catch (e) {
        console.error(e)
        return message.channel.send('An unexpected error has occured!')
    }
}
