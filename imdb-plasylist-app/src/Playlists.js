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

    const [newPlaylistValue, setNewPlaylistValue] = useState('');
    const [newPlaylistInProgress, setNewPlaylistInProgress] = useState(false);
    const state = useSelector(state => state);
    return (
        <div>
            {/* Load playlists - need single playlist component to pass data to */}
            {state && state.userPlaylists && state.userPlaylists.length > 0 && <ul className="playlists">
                {state.userPlaylists.map((playlist) => {
                    return <li key={playlist.id}>
                        {playlist.name} - {playlist.movies.length > 0 ? playlist.movies : <span className="no-movies-in-playlist">No movies in this playlist.</span>}
                    </li>
                })}
            </ul>}
            {(!state || !state.userPlaylists || state.userPlaylists.length === 0) && <p>User has no current playlists</p>}
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
