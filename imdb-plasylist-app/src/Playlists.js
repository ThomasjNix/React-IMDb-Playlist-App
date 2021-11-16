import React, { useState } from 'react'
import { ACTIONS } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, ButtonGroup, Input, List, ListItem, Grid, Card, CardContent, CardActions } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const Playlists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const saveNewPlaylist = (event = null) => {
        if (event) {
            event.preventDefault();
        }
        if (newPlaylistValue) {
            dispatch({ type: ACTIONS.CREATE_PLAYLIST, payload: { playlistName: newPlaylistValue } });
            setNewPlaylistValue('');
            setNewPlaylistInProgress(false);
        }
    }
    
    const confirmPlaylist = (playlist) => {
        dispatch({ type: ACTIONS.CONFIRM_PLAYLIST, payload: { playlist } });
        navigate(`/confirmation/${playlist.id}`);
    }
    const cancelPlaylist = (playlist) => {
        dispatch({ type: ACTIONS.CANCEL_PLAYLIST, payload: { playlist } });
    }
    const deletePlaylist = (playlist) => {
        dispatch({ type: ACTIONS.DELETE_PLAYLIST, payload: { playlist } });
    }
    const removeMovieFromPlaylist = (playlist, movie) => {
        dispatch({ type: ACTIONS.REMOVE_MOVIE_FROM_PLAYLIST, payload: { playlistID: playlist.id, movieID: movie.imdbID } });
    }

    const [newPlaylistValue, setNewPlaylistValue] = useState('');
    const [newPlaylistInProgress, setNewPlaylistInProgress] = useState(false);
    const userPlaylists = useSelector(state => state.userPlaylists);
    return (
        <div>
            {userPlaylists && userPlaylists.length > 0 && <Grid container spacing={2} className="playlists">
                {userPlaylists.map((playlist) => {
                    return <Grid item xs={6} lg={4} className="playlist-item" key={playlist.id}>
                        <Card variant="outlined">
                            <CardContent>
                            <h4>{playlist.name}</h4>
                            <p className="playlist-description">
                                {playlist.movies.length > 0 && playlist.movies.map((movie, index) => <span key={playlist.name + '-' + movie.imdbID}>
                                    <CancelIcon onClick={() => {removeMovieFromPlaylist(playlist, movie)}}></CancelIcon>
                                    {movie.Title}
                                </span>) }
                                {(!playlist || !playlist.movies || playlist.movies.length === 0) && <span className="no-movies-in-playlist">No movies in this playlist.</span>}
                            </p>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup size="small" aria-label="small button group">
                                    { playlist.inEdit && <Button size="small" color="success" variant="contained" onClick={() => { confirmPlaylist(playlist)}}>Confirm</Button>}
                                    { playlist.inEdit && <Button size="small" color="secondary" variant="contained" onClick={() => { cancelPlaylist(playlist)}}>Cancel changes</Button>}
                                    {userPlaylists.length !== 1 && <Button color="error" size="small" variant="contained" onClick={() => { deletePlaylist(playlist)}}>Delete</Button>}
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </Grid>
                })}
            </Grid>}
            {(!userPlaylists || userPlaylists.length === 0) && <p>User has no current playlists</p>}
            {!newPlaylistInProgress && <Button size="small" className="create-new-playlist" variant="contained" onClick={() => { setNewPlaylistInProgress(true) }}>Create new playlist</Button>}
            {newPlaylistInProgress &&
                <form onSubmit={(event) => {saveNewPlaylist(event)}}>
                    <Input type="text" onChange={(event) => { setNewPlaylistValue(event.target.value) }} />
                    <Button disabled={newPlaylistValue === ''} size="small" variant="text" onClick={() => { saveNewPlaylist() }}>Save</Button>
                </form>
            }
        </div>
    )
}

export default Playlists
