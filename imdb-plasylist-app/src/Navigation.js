import React from 'react'
import { useState } from 'react';
import { API_KEY } from './apiKey';
import { SearchResultsContext } from './App';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Input } from '@mui/material';

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
    const submitSearch = (event = null) => {
        if (event) {
            event.preventDefault();
        }
        if (searchValue) {
            fetch(`http://www.omdbapi.com/?s=${searchValue.trim()}&apikey=${API_KEY}`)
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
    }
    const navigate = useNavigate();
    const setSearchResults = useContext(SearchResultsContext).setSearchResults;
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="top-nav">
            <h3>IMDb playlist app</h3>
            <div className="nav-actions">
            {location.pathname !== '/' && <Link className="return-home" underline="none" to="/">Return Home</Link>}
            <form onSubmit={(event) => { submitSearch(event) }}>
                <Input type="text" placeholder="Enter a movie name" onChange={(event) => { setSearchValue(event.target.value) }} />
                <Button disabled={searchValue === ''} size="small" variant="text" onClick={() => { submitSearch() }}>Search</Button>
            </form>
            </div>
        </div>
    )
}

export default Navigation
