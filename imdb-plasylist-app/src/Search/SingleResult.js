import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTIONS } from '../redux/actions';

const SingleResult = ({ result, playlists }) => {
    const dispatch = useDispatch();
    const addToSelectedPlaylist = () => {
        dispatch({type: ACTIONS.ADD_TO_PLAYLIST, payload: {
            movieContent: result,
            playlistName: selectedPlaylist
        }});
    }
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0].name);
    return (
        <div className="result">
            {result.Poster && <img src={result.Poster} alt={result.Title + ' poster'} />}
            <p>{result.Title}</p>
            <select onChange={(event) => {setSelectedPlaylist(event.target.value)}}>
                {playlists.map((playlist) => {
                    return <option key={`${result.imdbID}-${playlist.id}`}>{playlist.name}</option>
                })}
            </select>
            <button onClick={() => {addToSelectedPlaylist()}}>Add to playlist</button>
        </div>
    )
}

export default SingleResult
