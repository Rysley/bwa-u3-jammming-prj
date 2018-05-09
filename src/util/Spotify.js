

let accessToken;
let expiresIn;
let trackURIs;
const clientID = '29a0417988d240278ab3272a9c16cc83';
const redirectURI = "http://localhost:3000/";

const Spotify = {

  getAccessToken() {

    if (accessToken !== undefined) {
      return accessToken;
    }

    let tokenValue = window.location.href.match(/access_token=([^&]*)/);
    let expDate = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenValue === true && expDate === true) {
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }

  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => response.json()).then(responseJson => {
      if (responseJson.tracks === undefined) {
        return [];
      } else {
        return responseJson.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      }
    })

  },

  /*savePlaylist(name, tracksURIs) {
    if (name !== undefined && tracksURIs !== undefined) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`};
    let userId;

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({name: name}
        ).then(response => response.json()
      ).then(playlist => {
        playlistID = playlist.id;
      })

  }*/

};

export default Spotify;
