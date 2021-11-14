import React from 'react'
import { useContext } from 'react';
import { SearchResultsContext } from '../App';

const SearchResults = () => {
    const {searchResults, setSearchResults} = useContext(SearchResultsContext);
    return (
        <div>
            { searchResults.map((result) => { 
                return <p key={result.imdbID}>{result.Title}</p>}
            ) }
        </div>
    )
}

export default SearchResults
