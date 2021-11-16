import { ACTIONS } from "./actions";

const INITIAL_STATE = {
    userPlaylists: [
        {
            name: 'My Playlist',
            movies: [],
            id: 0,
            inEdit: false,
            inEditMovies: []
        }
    ]
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TO_PLAYLIST:
            return {...state, userPlaylists: state.userPlaylists.map((playlist) => {
                if (playlist.name === action.payload.playlistName) {
                    playlist.movies.push(action.payload.movieContent);
                    playlist.inEditMovies.push(action.payload.movieContent);
                    playlist.inEdit = true;
                }
                return playlist;
            })}
        case ACTIONS.REMOVE_FROM_PLAYLIST:
            break;
        case ACTIONS.CREATE_PLAYLIST:
            const updatedPlaylist = state.userPlaylists;
            updatedPlaylist.push({
                name: action.payload.playlistName,
                movies: [],
                id: state.userPlaylists.length,
                inEdit: false,
                inEditMovies: []
            });
            return { ...state, userPlaylists: updatedPlaylist };
        case ACTIONS.DELETE_PLAYLIST:
            return { ...state, userPlaylists: state.userPlaylists.filter((playlist) => playlist.id !== action.payload.playlist.id)}
        case ACTIONS.CONFIRM_PLAYLIST:
            return {...state, userPlaylists: state.userPlaylists.map((playlist) => {
                if (playlist.id === action.payload.playlist.id) {
                    playlist.inEdit = false;
                    playlist.inEditMovies = [];
                }
                return playlist;
            })}
        default:
            return state;
    }
}