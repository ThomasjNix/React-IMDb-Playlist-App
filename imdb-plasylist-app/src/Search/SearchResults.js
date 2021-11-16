import React from 'react'
import { useContext } from 'react';
import { SearchResultsContext } from '../App';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const searchResults = useContext(SearchResultsContext).searchResults;
    return (
        <div>
            <Link to="/">Return Home</Link>
            {searchResults.map((result) => {
                return <div className="result"  key={result.imdbID}>
                    {result.Poster && <img src={result.Poster} alt={result.Title + ' poster'} />}
                    <p>{result.Title}</p>
                    <button>Add to playlist</button>
                </div>
            }
            )}
        </div>
    )
}

export default SearchResults
