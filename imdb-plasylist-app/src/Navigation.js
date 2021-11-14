import React from 'react'
import { useState } from 'react';
import { API_KEY } from './apiKey';
import { SearchResultsContext } from './App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const {searchResults, setSearchResults} = useContext(SearchResultsContext);
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
            setSearchResults([results]);
            navigate('/search-results');
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
