import React from 'react';
import TrackList from '../../Components/TrackList/TrackList.js';
import renderer from 'react-test-renderer';

var tracks = [
  {
    name: 'Only You',
    artist: 'Elvis',
    album: 'BestElvis',
    id: '19501950'
  },
  {
    name: 'Memphis',
    artist: 'Elvis',
    album: 'BestElvis',
    id: '19501952'
  }
]

test(
  'Renders tracks', () => {

    const tracklist = renderer.create(
      <TrackList tracks={tracks} />
    );

    let tree = tracklist.toJSON();
    expect(tree).toBe(
        <div className="TrackList">
          <div className="Track">
            <div className="Track-information">
              <h3>Only You</h3><p>Elvis | BestElvis</p>
            </div><a className="Track-action" />
          </div>
          <div className="Track">
            <div className="Track-information">
              <h3>Memphis</h3><p>Elvis | BestElvis</p>
            </div><a className="Track-action" />
          </div>
        </div>
      );
  }
)
