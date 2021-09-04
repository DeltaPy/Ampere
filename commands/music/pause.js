module.exports = (client, message) => {

    // check before action
    if(!message.member.voice.channel) return message.channel.send('😔 - You are not in a voice channel!')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('🤔 - The bot is in another voice channel!')

    // check if queue is empty
    if(!client.player.getQueue(message)) return message.channel.send('🤔 - No music is currently playing!')
    // check if paused
    if(client.player.getQueue(message).paused) return message.channel.send('🤔 - The music is already paused!')

    try {
        client.player.pause(message)
        return message.channel.send('⏸️ - paused!')
    } catch (e) {
        console.error(e)
        return message.channel.send('An unexpected error has occured!')
    }
}
