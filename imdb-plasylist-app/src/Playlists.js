import React, { useState } from 'react'
import { ACTIONS } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Input, List, ListItem } from '@mui/material';

const Playlists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const saveNewPlaylist = (event = null) => {
        if (event) {
            event.preventDefault();
        }
        dispatch({ type: ACTIONS.CREATE_PLAYLIST, payload: { playlistName: newPlaylistValue } });
        setNewPlaylistValue('');
        setNewPlaylistInProgress(false);
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

    const [newPlaylistValue, setNewPlaylistValue] = useState('');
    const [newPlaylistInProgress, setNewPlaylistInProgress] = useState(false);
    const userPlaylists = useSelector(state => state.userPlaylists);
    return (
        <div>
            {/* Load playlists - need single playlist component to pass data to */}
            {userPlaylists && userPlaylists.length > 0 && <List className="playlists">
                {userPlaylists.map((playlist) => {
                    return <ListItem key={playlist.id}>
                        {playlist.name}: {playlist.movies.length > 0 && playlist.movies.map((movie, index) => `${movie.Title}${index === playlist.movies.length - 1 ? '' : ', '}`) }
                        {(!playlist || !playlist.movies || playlist.movies.length === 0) && <span className="no-movies-in-playlist">No movies in this playlist.</span>}
                        { playlist.inEdit && <Button variant="contained" onClick={() => { confirmPlaylist(playlist)}}>Confirm playlist</Button>}
                        { playlist.inEdit && <Button variant="contained" onClick={() => { cancelPlaylist(playlist)}}>Cancel playlist changes</Button>}
                        {userPlaylists.length !== 1 && <Button variant="contained" onClick={() => { deletePlaylist(playlist)}}>Delete playlist</Button>}
                    </ListItem>
                })}
            </List>}
            {(!userPlaylists || userPlaylists.length === 0) && <p>User has no current playlists</p>}
            {!newPlaylistInProgress && <Button variant="contained" onClick={() => { setNewPlaylistInProgress(true) }}>Create new playlist</Button>}
            {newPlaylistInProgress &&
                <form onSubmit={(event) => {saveNewPlaylist(event)}}>
                    <Input type="text" onChange={(event) => { setNewPlaylistValue(event.target.value) }} />
                    <Button variant="contained" onClick={() => { saveNewPlaylist() }}>Save</Button>
                </form>
            }
        </div>
    )
}

export default Playlists
