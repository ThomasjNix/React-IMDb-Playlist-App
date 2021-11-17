import React from 'react'
import Playlists from './Playlists';
import Instruction from './Instruction';

const Home = () => {
    return (
        <div>
            <Instruction message="Playlists and search queries must have a value. Playlists can only be deleted when there are at least 2 playlists total. Playlists can be empty. Cancelling changes will revert any additions or removals to a playlist."></Instruction>
            <h3>Current playlists:</h3>
            <Playlists />
        </div>
    )
}

export default Home
