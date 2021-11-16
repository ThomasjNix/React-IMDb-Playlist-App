import React from 'react'
import { useContext } from 'react';
import { SearchResultsContext } from '../App';
import SingleResult from './SingleResult';
import { useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';

const SearchResults = () => {
    const searchResults = useContext(SearchResultsContext).searchResults;
    const state = useSelector(state => state);
    return (
        <ImageList sx={{ width: "80vw"}} className="search-results-list">
            {searchResults.map((result) => {
                return <SingleResult playlists={state.userPlaylists} key={result.imdbID} result={result} />
            }
            )}
        </ImageList>
    )
}

export default SearchResults
