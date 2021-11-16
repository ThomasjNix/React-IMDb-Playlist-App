import React from 'react'
import { useContext } from 'react';
import { SearchResultsContext } from '../App';
import SingleResult from './SingleResult';
import { useSelector } from 'react-redux';

const SearchResults = () => {
    const searchResults = useContext(SearchResultsContext).searchResults;
    const state = useSelector(state => state);
    return (
        <div>
            {searchResults.map((result) => {
                return <SingleResult playlists={state.userPlaylists} key={result.imdbID} result={result} />
            }
            )}
        </div>
    )
}

export default SearchResults
