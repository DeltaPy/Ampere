module.exports = (client, message) => {

    // check before action
    if(!message.member.voice.channel) return message.channel.send('đ - You are not in a voice channel!')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('đ¤ - The bot is in another voice channel!')

    // check if queue is empty
    if(!client.player.getQueue(message)) return message.channel.send('đ¤ - No music is currently playing!')
    

    try {
        client.player.setRepeatMode(message, false)
        client.player.stop(message)
        return message.channel.send('âšī¸ - Music **stopped**!')
    } catch (e) {
        console.error(e)
        return message.channel.send('An unexpected error has occured!')
    }
}
