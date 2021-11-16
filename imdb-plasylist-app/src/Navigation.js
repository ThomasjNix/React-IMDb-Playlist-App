import React from 'react'
import { useState } from 'react';
import { API_KEY } from './apiKey';
import { SearchResultsContext } from './App';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Input } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

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



      
        <AppBar position="static">
          <Toolbar className={location.pathname === '/' ? 'nav-toolbar home' : 'nav-toolbar'}>
          
              {location.pathname !== '/' && <Link className="return-home" underline="none" to="/">Return Home</Link>}
         
            <Search className="nav-search-container">
              <SearchIconWrapper>
                <SearchIcon className="search-wrapper"/>
              </SearchIconWrapper>
              <form onSubmit={(event) => { submitSearch(event) }}>
                <Input type="text" className="search-input" onChange={(event) => { setSearchValue(event.target.value) }} />
                <Button className="search-button" disabled={searchValue === ''} size="small" variant="text" onClick={() => { submitSearch() }}>Search</Button>
            </form>
            </Search>
          </Toolbar>
        </AppBar>
  













        // <div className="top-nav">
        //     <h3>IMDb playlist app</h3>
        //     <div className="nav-actions">
        //     {location.pathname !== '/' && <Link className="return-home" underline="none" to="/">Return Home</Link>}
        //     <form onSubmit={(event) => { submitSearch(event) }}>
        //         <Input type="text" placeholder="Enter a movie name" onChange={(event) => { setSearchValue(event.target.value) }} />
        //         <Button disabled={searchValue === ''} size="small" variant="text" onClick={() => { submitSearch() }}>Search</Button>
        //     </form>
        //     </div>
        // </div>
    )
}

export default Navigation
