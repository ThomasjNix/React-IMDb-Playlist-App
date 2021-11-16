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
            // Prevent adding duplicates to playlist
            const playListMovieTitles = state.userPlaylists
            .find((playlist) => playlist.name === action.payload.playlistName)
            .movies.map((movie) => movie.Title);
            if (playListMovieTitles.indexOf(action.payload.movieContent.Title) === -1) {
                return {...state, userPlaylists: state.userPlaylists.map((playlist) => {
                    if (playlist.name === action.payload.playlistName) {
                        playlist.movies.push(action.payload.movieContent);
                        playlist.inEditMovies.push(action.payload.movieContent);
                        playlist.inEdit = true;
                    }
                    return playlist;
                })}
            } else {
                return state;
            }
        case ACTIONS.REMOVE_FROM_PLAYLIST:
            break;
        case ACTIONS.CREATE_PLAYLIST:
            // Prevent duplicate playlist names
            const playlistNames = state.userPlaylists.map((playlist) => playlist.name);
            if (playlistNames.indexOf(action.payload.playlistName) === -1) {
                const updatedPlaylist = state.userPlaylists;
                updatedPlaylist.push({
                    name: action.payload.playlistName,
                    movies: [],
                    id: state.userPlaylists.length,
                    inEdit: false,
                    inEditMovies: []
                });
                return { ...state, userPlaylists: updatedPlaylist };
            } else {
                return state;
            }
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
        case ACTIONS.CANCEL_PLAYLIST:
            const playlistIndex = state.userPlaylists.findIndex((playlist) => playlist.id === action.payload.playlist.id);
            const inEditMovieNames = state.userPlaylists[playlistIndex].inEditMovies.map((movie) => movie.Title);
            return {...state, userPlaylists: state.userPlaylists.map((playlist) => {
                if (playlist.id === action.payload.playlist.id) {
                    playlist.movies = playlist.movies.filter((movie) => inEditMovieNames.indexOf(movie.Title) === -1);
                    playlist.inEditMovies = [];
                    playlist.inEdit = false;
                }
                return playlist;
            })}
        default:
            return state;
    }
}