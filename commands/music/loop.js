module.exports = (client, message, args) => {

    // check before action
    if(!message.member.voice.channel) return message.channel.send('😔 - You are not in a voice channel!')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('🤔 - The bot is in another voice channel!')

    // check if queue is empty
    if(!client.player.getQueue(message)) return message.channel.send('🤔 - No music is currently playing!')


    try {
        if (args[1] === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`🔁 - Repeat **disabled**!`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`🔁 - Repeat queue **enabled**!`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`🔁 - Repeat **disabled**!`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`🔁 - Repeat song **enabled**!`);
            };
        };
    } catch (e) {
        console.error(e)
        return message.channel.send('An unexpected error has occured!')
    }
}
