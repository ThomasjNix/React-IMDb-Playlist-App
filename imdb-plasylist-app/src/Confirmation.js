import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { Grid, Card, CardContent } from '@mui/material';

const Confirmation = () => {
    const userPlaylists = useSelector(state => state.userPlaylists);
    const { id } = useParams();
    let [playlistData, setPlaylistData] = useState({});

    useEffect(() => {
        playlistData = userPlaylists.find((playlist) => playlist.id === id);
        if (playlistData) {
            setPlaylistData(playlistData);
        }
    }, [id])

    return (
        <div>
            {!playlistData && <h3>Loading...</h3>}
            {playlistData && <h2>Playlist confirmed: {playlistData.name} </h2>}
            <p>Movies in playlist:</p>
            <Grid container spacing={2} className="confirmation-grid">
                {playlistData && playlistData.movies && playlistData.movies.map((movie) => {
                    return <Grid item xs={6} lg={2} className="movie">
                        <Card className="card">
                            <CardContent>
                                <img src={movie.Poster} alt={movie.Title + ' poster'} />
                                <p>{movie.Title}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                })}
            </Grid>

        </div>
    )
}

export default Confirmation
