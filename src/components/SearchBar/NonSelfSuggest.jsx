import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import searchIcon from '../../assets/icons/search_icon.svg';

const NonSelfSuggestSearchBar = ({endpoint, suggestionDataOut, placeHolder}) => {
   const [query, setQuery] = useState(null);
   const [suggestions, setSuggestions] = useState([]);
 
   useEffect(() => {
      console.log(query);
      if(query === null){
         return;
      }
      if (typeof(query) === 'string' && query.trim() === '') {
         setSuggestions([]);
         return;
      }
      // if (timeoutId) {
      // clearTimeout(timeoutId);
      // }
   
      // set a new timeout
      
      fetchSuggestions(query);
   
      // cleanup function
      // return () => {
      // if (timeoutId) {
      //    clearTimeout(timeoutId);
      // }
      // };
     }
   , [query]);
 
   // suggest == false -> suggestions are displayed elsewhere
   useEffect(() => {
      suggestionDataOut(suggestions);
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
      setQuery(event.target.value);
      // if(isFound){
      //   setIsFound(false);
      // }
    };
  
   return (
    <div>
      <div className='flex items-center bg-white p-1 rounded-md border-2'>
      <img className='w-6 h-6' src={searchIcon} alt="" />
      <div className='w-2'></div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e)}
        placeholder={placeHolder ? placeHolder : 'Search...'}
        className="bg-inherit text-md outline-none w-full"
      />
      </div>
    </div>
  )
}

NonSelfSuggestSearchBar.propTypes = {
   endpoint: PropTypes.string.isRequired,
   suggestionDataOut: PropTypes.func.isRequired,
   placeHolder: PropTypes.string,
}

export default NonSelfSuggestSearchBar