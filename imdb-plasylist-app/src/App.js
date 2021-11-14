import './App.css';
import Home from './Home';
import Navigation from './Navigation';
import SearchResults from './Search/SearchResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';


export const SearchResultsContext = React.createContext({
  searchResults: [],
  setSearchResults: () => {}
});

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <Router>
      <div className="App">
        <SearchResultsContext.Provider value={{searchResults, setSearchResults}}>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route exact path="/search-results" element={<SearchResults />}>
            </Route>
          </Routes>
        </SearchResultsContext.Provider>
      </div>
    </Router>
  );
}

export default App;
