import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/icons/search_icon.svg';


/**
 * selfSuggest: boolean
 * true -> suggestions are displayed under searchbox as unordered list
 * false -> suggestions are displayed elsewhere (developer must handle the display based on suggestionsDataOut)
 */
const SearchBar = ({
  endpoint, // endpoint for fetching suggestions
  selfSuggest, // 
  suggestionsDataOut, // function to output suggestions data
  onSuggestionSelected, // function to handle selected suggestion
  placeHolder, // placeholder for search input
  containerStyle, 
  inputStyle,
  suggestionsStyle,
  onChangeQueryAfterSelect // remove data when query changes after selecting a suggestion
}) => {
  const [query, setQuery] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isFound, setIsFound] = useState(false);
  let timeoutId = null;

  useEffect(() => {
    if (typeof(query) === 'string' && query.trim() === '' && selfSuggest === true) {
      setSuggestions([]);
      return;
    }
    console.log('is found: ' + isFound);
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
  }, [query]);

  // suggest == false -> suggestions are displayed elsewhere
  useEffect(() => {
    if(selfSuggest === false){
      suggestionsDataOut(suggestions);
    }
  }, [suggestions]);

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
    if(isFound){
      setIsFound(false);
    }
    if(selfSuggest === true){
      onChangeQueryAfterSelect();
    }
    setQuery(event.target.value);
  };

  const handleSelectSuggestions = (suggestion) => {
    console.log('selected suggestion: ' + suggestion.entity_name);
    onSuggestionSelected(suggestion);
    if(isFound === false){
      setIsFound(true);
    }
    setQuery(suggestion.entity_name);
    if(selfSuggest === true){
      setSuggestions([]);
    }else{
      suggestionsDataOut(suggestions);
    }
  }

  return (
    <div className={containerStyle && containerStyle}>
      <div className='flex items-center bg-white p-1 rounded-md border-2'>
      <img className='w-6 h-6' src={searchIcon} alt="" />
      <div className='w-2'></div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e)}
        placeholder={placeHolder ? placeHolder : 'Search...'}
        //className={inputStyle && inputStyle}
        className="bg-inherit text-md outline-none w-full"
      />
      </div>
      {(suggestions.length > 0 && selfSuggest === true) ? (
        <ul
        className='absolute z-10 '
        >
          {suggestions.map((suggestion, index) => (
            <li 
            key={index} 
            onClick={handleSelectSuggestions.bind(this, suggestion)}
            //className={suggestionsStyle && suggestionsStyle}
            className='p-1 flex place-content-between bg-white w-full border-b-2 cursor-pointer rounded-md hover:bg-gray-200 duration-200'
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
      )
      :
      !isFound && selfSuggest && (query !== null)
      ?
      <li className='p-1 flex place-content-between bg-white border-b-2 absolute z-10'>
            <span>
              No suggestions found
            </span>
      </li>
      :
      ''
      }
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
