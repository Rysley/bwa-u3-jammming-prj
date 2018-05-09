import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      alert(`"${this.state.playlistTracks[0].name}" by ${this.state.playlistTracks[0].artist} already exists in the ${this.state.playlistName} playlist!`);
    } else {
      this.setState({playlistTracks: this.state.playlistTracks.push(track)});
      console.log('Yay, not a match');
    }
  }


  removeTrack(track) {
    let tracksArr = this.state.playlistTracks;
    this.setState({playlistTracks: tracksArr.filter(delTrack => delTrack.id !== track.id)});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let tracksURIs = [];
    this.state.playlistTracks.map(uri => tracksURIs.push(`spotify:track:${uri.id}`));
    Spotify.savePlaylist(this.state.playlistName, tracksURIs);
		this.setState({playlistName: 'New Playlist', playlistTracks: []});
    console.log(tracksURIs);
    return tracksURIs;
  }

  search(term) {
    let searchResult = Spotify.search(term);
    this.setState({searchResults: searchResult});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
            />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              />
            <Playlist
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              />
          </div>
        </div>
      </div>
    );
  }

}



export default App;
