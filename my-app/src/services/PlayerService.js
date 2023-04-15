const axios = require('axios');

export async function getPlayer(id) {
    const response = await axios.get('/api/player/' + id);
    console.log("Got player: " + response.data)
    return response.data;
}

export async function updateHeight(id, height) {
    const response = await axios.patch(`/api/player`, {id: id, height: height});
    return response.data;
}

export async function getAllPlayers() {
    const response = await axios.get('/api/player');
    console.log("Got players: " + response.data)
    return response.data;
}
