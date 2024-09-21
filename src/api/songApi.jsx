

const baseUrl = import.meta.env.VITE_APP_SERVER_URL + "songs/"
const DEAFULHEADER = { "Content-Type": "application/json", dataType: "json" }

export const LiveSong = async (songId) => {
  return fetch(baseUrl + songId)
    .then(response => response.json())
    .catch(error => console.log('error', error));

}

export const GetSongsQuery = async (query) => {


  return fetch(baseUrl + "ByQuery/" + query)
    .then(response => response.json())
    .catch(error => console.log('error', error));

}