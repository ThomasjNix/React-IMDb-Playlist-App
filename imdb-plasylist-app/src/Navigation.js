import React from 'react'
import { useState } from 'react';
import { API_KEY } from './apiKey';

const Navigation = () => {
    const [searchValue, setSearchValue] = useState('');
    const submitSearch = (event) => {
        event.preventDefault();
        fetch(`http://www.omdbapi.com/?t=${searchValue}&apikey=${API_KEY}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((results) => {
            console.log(results);
        });
    }
    return (
        <div>
            <h3>IMDb playlist app</h3>
            <form onSubmit={(event) => { submitSearch(event) }}>
                <input type="text" placeholder="Enter a movie name" onChange={(event) => {setSearchValue(event.target.value)}}/>
                <button>Search</button>
            </form>
        </div>
    )
}

export default Navigation
