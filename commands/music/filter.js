module.exports = (client, message, args) => {

    // check before action
    if(!message.member.voice.channel) return message.channel.send('😔 - You are not in a voice channel!')
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
    return message.channel.send('🤔 - The bot is in another voice channel!')

    // check if queue is empty
    if(!client.player.getQueue(message)) return message.channel.send('🤔 - No music is currently playing!')
    // Find filter
    console.log(args)
    const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args.toLowerCase())
    if (!filterToUpdate) return message.channel.send("😔 - This filter doesn't exist, try for example (8D, vibrato, pulsator...)!")
    // Enabled filters
    const filtersUpdated = {}

    try {
        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true
        client.player.setFilters(message, filtersUpdated)

        if (filtersUpdated[filterToUpdate]) message.channel.send("⏱️ - I'm adding the filter to the music, please wait...")
        else message.channel.send("⏱️ - I'm disabling the filter on the music, please wait...")
    } catch (e) {
        console.error(e)
        return message.channel.send('An unexpected error has occured!')
    }
}
