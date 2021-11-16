import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTIONS } from '../redux/actions';
import { Button } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Card, CardContent, CardActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SingleResult = ({ result, playlists }) => {
    const dispatch = useDispatch();
    const addToSelectedPlaylist = () => {
        dispatch({
            type: ACTIONS.ADD_TO_PLAYLIST, payload: {
                movieContent: result,
                playlistName: selectedPlaylist
            }
        });
    }
    const itemInPlaylist = () => {
        // TODO
        return true;
    }
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0].name);
    return (
        <Card variant="outlined">
            <CardContent className="result">
                <ImageListItemBar title={result.Title} position="below" />
                {result.Poster && <img className="poster" loading="lazy" src={result.Poster} alt={result.Title + ' poster'} />}
            </CardContent>
            <CardActions className="single-result-actions">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select value={selectedPlaylist} onChange={(event) => { setSelectedPlaylist(event.target.value) }}>
                        {playlists.map((playlist) => {
                            return <MenuItem key={`${result.imdbID}-${playlist.id}`} value={playlist.name}>{playlist.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {!itemInPlaylist() && <Button size="small" variant="contained" onClick={() => { addToSelectedPlaylist() }}>Add to playlist</Button>}
                {itemInPlaylist() && <Button size="small" variant="contained" disabled>Added</Button>}
            </CardActions>
        </Card>
    )
}

export default SingleResult
