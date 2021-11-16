import './App.css';
import Home from './Home';
import Navigation from './Navigation';
import SearchResults from './Search/SearchResults';
import Confirmation from './Confirmation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { reducer } from './redux/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

export const SearchResultsContext = React.createContext({
  searchResults: [],
  setSearchResults: () => { }
});


function App() {
  const [searchResults, setSearchResults] = useState([]);
  // Improve SearchResultsContext with Redux pattern? May not be necessary
  // If multiple playlists, need component for handling playlists & selecting from search results page
  return (
    <Router>
      <div className="App">
        <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route exact path="/search-results" element={<SearchResults />}>
            </Route>
            <Route exact path="/confirmation/:id" element={<Confirmation />}>
            </Route>
          </Routes>
        </SearchResultsContext.Provider>
      </div>
    </Router>
  );
}


const AppWrapper = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


export default AppWrapper;
