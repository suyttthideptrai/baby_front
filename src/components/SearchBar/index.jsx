import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


/**
 * selfSuggest: boolean
 * true -> suggestions are displayed under searchbox as unordered list
 * false -> suggestions are displayed elsewhere (developer must handle the display based on suggestionsDataOut)
 */
const SearchBar = ({
  endpoint,
  selfSuggest,
  suggestionsDataOut,
  onSuggestionSelected,
  placeHolder,
  containerStyle,
  inputStyle,
  suggestionsStyle,
  onChangeQueryAfterSelect
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFound, setIsFound] = useState(false);
  let timeoutId = null;

  useEffect(() => {
    if (typeof(query) === 'string' && query.trim() === '') {
      setSuggestions([]);
      return;
    }
    if(!isFound){
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    
      // set a new timeout
      timeoutId = setTimeout(() => {
        fetchSuggestions(query);
      }, 500); 
    
      // cleanup function
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [query, isFound]);
  useEffect(() => {
    if(selfSuggest === false){
      suggestionsDataOut(suggestions);
    }
  }, [suggestions, selfSuggest]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`${endpoint}${query}`);
      if (!response.ok) {
        alert('An error occurred while fetching suggestions');
        return;
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setIsFound(false);
    if(selfSuggest === true){
      onChangeQueryAfterSelect();
    }
    setQuery(event.target.value);
  };

  const handleSelectSuggestions = (suggestion) => {
    setQuery(suggestion.entity_name);
    setIsFound(true);
    setSuggestions([]);
    onSuggestionSelected(suggestion);
  }

  return (
    <div className={containerStyle && containerStyle}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e)}
        placeholder={placeHolder ? placeHolder : 'Search...'}
        //className={inputStyle && inputStyle}
        className="p-1"
      />
      {(suggestions.length > 0 && selfSuggest === true) && (
        <ul
        className='absolute z-10 '
        >
          {suggestions.map((suggestion, index) => (
            <li 
            key={index} 
            onClick={handleSelectSuggestions.bind(this, suggestion)}
            //className={suggestionsStyle && suggestionsStyle}
            className='p-1 flex place-content-between bg-white w-full border-b-2 cursor-pointer'
            >
              <span>
              {suggestion.entity_name ? suggestion.entity_name : "undefined"}
              </span>
              <span className='text-slate-500'>
                {suggestion.entity_id ? suggestion.entity_id : "undefined"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  endpoint: PropTypes.string.isRequired,
  selectedQuery: PropTypes.string,
  onSuggestionSelected: PropTypes.func.isRequired,
  containerStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  suggestionsStyle: PropTypes.string,
  placeHolder: PropTypes.string,
  onChangeQueryAfterSelect: PropTypes.func,
  selfSuggest: PropTypes.bool,
  suggestionsDataOut: PropTypes.func
};
