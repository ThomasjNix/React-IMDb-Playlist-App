import { ACTIONS } from "./actions";

const INITIAL_STATE = {
    userPlaylists: [
        {
            name: 'My Playlist',
            movies: [],
            id: 0,
            inEdit: false
        }
    ]
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TO_PLAYLIST:
            let playlistIndex = state.userPlaylists.findIndex((playlist) => playlist.name === action.payload.playlistName);
            state.userPlaylists[playlistIndex].movies.push(action.payload.movieContent);
            return state;
        case ACTIONS.REMOVE_FROM_PLAYLIST:
            break;
        case ACTIONS.CREATE_PLAYLIST:
            const updatedPlaylist = state.userPlaylists;
            updatedPlaylist.push({
                name: action.payload.playlistName,
                movies: [],
                id: state.userPlaylists.length,
                inEdit: false
            });
            return { ...state, userPlaylists: updatedPlaylist };
        case ACTIONS.DELETE_PLAYLIST:
            break;
        default:
            return state;
    }
}