import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { Button } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Card, CardContent, CardActions, Select, MenuItem, FormControl } from '@mui/material';

const SingleResult = ({ result, playlists }) => {
    const dispatch = useDispatch();
    const addToSelectedPlaylist = () => {
        dispatch({
            type: ACTIONS.ADD_TO_PLAYLIST, payload: {
                movieContent: result,
                playlistName: selectedPlaylistName
            }
        });
    }
    const updateSelectedPlaylist = (playlistName) => {
        setSelectedPlaylist(playlists.find((playlist) => playlist.name === playlistName));
    }
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
    const [selectedPlaylistName, setSelectedPlaylistName] = useState(playlists[0].name);
    const itemInPlaylist = () => {
        return selectedPlaylist && selectedPlaylist.movies.find((movie) => movie.imdbID === result.imdbID);
    }
    return (
        <Card variant="outlined">
            <CardContent className="result">
                <ImageListItemBar title={result.Title} position="below" />
                {result.Poster && <img className="poster" loading="lazy" src={result.Poster} alt={result.Title + ' poster'} />}
            </CardContent>
            {selectedPlaylistName && <CardActions className="single-result-actions">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select value={selectedPlaylistName} onChange={(event) => { updateSelectedPlaylist(event.target.value); setSelectedPlaylistName(event.target.value) }}>
                        {playlists.map((playlist) => {
                            return <MenuItem key={`${result.imdbID}-${playlist.id}`} value={playlist.name}>{playlist.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {!itemInPlaylist() && <Button size="small" variant="contained" onClick={() => { addToSelectedPlaylist() }}>Add to playlist</Button>}
                {itemInPlaylist() && <Button size="small" variant="contained" disabled>Added</Button>}
            </CardActions>}
        </Card>
    )
}

export default SingleResult
