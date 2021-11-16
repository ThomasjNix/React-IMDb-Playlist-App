import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';

const Confirmation = () => {
    const userPlaylists = useSelector(state => state.userPlaylists);
    const { id } = useParams();
    let [playlistData, setPlaylistData] = useState({});

    useEffect(() => {
        playlistData = userPlaylists.find((playlist) => playlist.id === parseInt(id));
        if (playlistData) {
            setPlaylistData(playlistData);
        }
    }, [id])

    return (
        <div>
            { !playlistData && <h3>Loading...</h3>}
            { playlistData && <h2>Playlist confirmed: {playlistData.name} </h2>}
            <p>Movies in playlist:</p>
            { playlistData && playlistData.movies && playlistData.movies.map((movie) => {
                return <div className="movie">
                    <img src={movie.Poster} alt={movie.Title + ' poster'} />
                    <p>{movie.Title}</p>
                </div>
            })}
        </div>
    )
}

export default Confirmation
