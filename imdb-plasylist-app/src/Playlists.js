import React, { useState } from 'react'
import { ACTIONS } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Playlists = () => {
    const dispatch = useDispatch();
    const saveNewPlaylist = () => {
        dispatch({ type: ACTIONS.CREATE_PLAYLIST, payload: { playlistName: newPlaylistValue } });
        setNewPlaylistValue('');
        setNewPlaylistInProgress(false);
    }
    
    const confirmPlaylist = (playlist) => {
        dispatch({ type: ACTIONS.CONFIRM_PLAYLIST, payload: { playlist } });
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
            {userPlaylists && userPlaylists.length > 0 && <ul className="playlists">
                {userPlaylists.map((playlist) => {
                    return <li key={playlist.id}>
                        {playlist.name}: {playlist.movies.length > 0 && playlist.movies.map((movie, index) => `${movie.Title}${index === playlist.movies.length - 1 ? '' : ', '}`) }
                        {(!playlist || !playlist.movies || playlist.movies.length === 0) && <span className="no-movies-in-playlist">No movies in this playlist.</span>}
                        { playlist.inEdit && <button onClick={() => { confirmPlaylist(playlist)}}>Confirm playlist</button>}
                        { playlist.inEdit && <button onClick={() => { cancelPlaylist(playlist)}}>Cancel playlist changes</button>}
                        {userPlaylists.length !== 1 && <button onClick={() => { deletePlaylist(playlist)}}>Delete playlist</button>}
                    </li>
                })}
            </ul>}
            {(!userPlaylists || userPlaylists.length === 0) && <p>User has no current playlists</p>}
            {!newPlaylistInProgress && <button onClick={() => { setNewPlaylistInProgress(true) }}>Create new playlist</button>}
            {newPlaylistInProgress &&
                <>
                    <input type="text" onChange={(event) => { setNewPlaylistValue(event.target.value) }} />
                    <button onClick={() => { saveNewPlaylist() }}>Save</button>
                </>
            }
        </div>
    )
}

export default Playlists
