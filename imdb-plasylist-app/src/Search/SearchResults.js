import React from 'react'
import { useContext } from 'react';
import { SearchResultsContext } from '../App';
import SingleResult from './SingleResult';
import { useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import { Grid, Card } from '@mui/material';

const SearchResults = () => {
    const searchResults = useContext(SearchResultsContext).searchResults;
    const state = useSelector(state => state);
    return (
        <Grid spacing={2} container className="search-results-list">
            {searchResults.map((result) => {
                return <Grid key={result.imdbID} item xs={6} lg={4}>
                    
                        <SingleResult playlists={state.userPlaylists} key={result.imdbID} result={result} />
                  
                </Grid>
            }
            )}
        </Grid>
    )
}

export default SearchResults
