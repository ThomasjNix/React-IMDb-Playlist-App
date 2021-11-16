import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { Button } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

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
        <ImageListItem className="result">
            {result.Poster && <img className="poster" loading="lazy" src={result.Poster} alt={result.Title + ' poster'} />}
            <ImageListItemBar title={result.title} position="below"/>
            <select onChange={(event) => {setSelectedPlaylist(event.target.value)}}>
                {playlists.map((playlist) => {
                    return <option key={`${result.imdbID}-${playlist.id}`}>{playlist.name}</option>
                })}
            </select>
            <Button variant="contained" onClick={() => {addToSelectedPlaylist()}}>Add to playlist</Button>
        </ImageListItem>
    )
}

export default SingleResult
