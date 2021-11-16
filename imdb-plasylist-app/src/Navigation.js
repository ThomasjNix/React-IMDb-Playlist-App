import React from 'react'
import { useState } from 'react';
import { API_KEY } from './apiKey';
import { SearchResultsContext } from './App';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    const removeDuplicateResults = (noDuplicateResults) => {
        const IDs = [];
        for (let i = noDuplicateResults.length - 1; i >= 0; i--) {
            if (IDs.indexOf(noDuplicateResults[i].imdbID) === -1) {
                IDs.push(noDuplicateResults[i].imdbID);
            } else {
                noDuplicateResults.splice(i, 1);
            }
        }
        return noDuplicateResults;
    }
    const submitSearch = (event) => {
        event.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((results) => {
                if (results && results.Search) {
                    // Encountered duplicates in some responses, this will prevent duplicate elements from being rendered with the same key in SearchResults
                    let noDuplicateResults = removeDuplicateResults(results.Search);
                    setSearchResults(noDuplicateResults);
                } else {
                    setSearchResults([]);
                }
                navigate('/search-results');
            });
    }
    const navigate = useNavigate();
    const setSearchResults = useContext(SearchResultsContext).setSearchResults;
    const [searchValue, setSearchValue] = useState('');
    return (
        <div>
            <h3>IMDb playlist app</h3>
            <form onSubmit={(event) => { submitSearch(event) }}>
                <input type="text" placeholder="Enter a movie name" onChange={(event) => { setSearchValue(event.target.value) }} />
                <button>Search</button>
            </form>
            {location.pathname !== '/' && <Link to="/">Return Home</Link>}
        </div>
    )
}

export default Navigation
