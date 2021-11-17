import { ACTIONS } from "./actions";
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
    userPlaylists: [
        {
            name: 'My Playlist',
            movies: [],
            id: uuidv4(),
            inEdit: false,
            inEditMovies: [],
            inEditRemovedMovies: []
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
                    id: uuidv4(),
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
                    playlist.inEditRemovedMovies = [];
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
                    for (const movie of playlist.inEditRemovedMovies) {
                        playlist.movies.push(movie);
                    }
                    playlist.inEditRemovedMovies = [];
                }
                return playlist;
            })}
        case ACTIONS.REMOVE_MOVIE_FROM_PLAYLIST:
            return {...state, userPlaylists: state.userPlaylists.map((playlist) => {
                if (playlist.id === action.payload.playlistID) {
                    const removeIndex = playlist.movies.findIndex((movie) => movie.imdbID === action.payload.movieID);
                    const removeInEditIndex = playlist.inEditMovies.findIndex((movie) => movie.imdbID === action.payload.movieID);
                    const removedMovie = playlist.movies[removeIndex];
                    // Remove from list of movies
                    playlist.movies.splice(removeIndex, 1);
                    // Also remove from in edit movies if it exists (for when playlist is not yet confirmed)
                    if (removeInEditIndex > -1) {
                        playlist.inEditMovies.splice(removeIndex, 1);
                    } else {
                        // Add to inEditRemovedMovies for when playlist is confirmed so that cancel changes will add back to movies list
                        playlist.inEditRemovedMovies.push(removedMovie);
                    }
                    playlist.inEdit = true;
                }
                return playlist;
            })}
        default:
            return state;
    }
}