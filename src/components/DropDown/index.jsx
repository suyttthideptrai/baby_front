import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, selectedOption, onChange, editable }) => {
    
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  if (editable) {
    return (
      <select
        className='border-2 bg-[#f4f5f7]'
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.type_id} value={option.type_id}>
            {option.type_name}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <div className='border-2 bg-[#f4f5f7] pr-8 pl-1 cursor-not-allowed'>
        {options.find((option) => option.type_id === selectedOption)?.type_name}
      </div>
    );
  }
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
        type_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type_name: PropTypes.string
    })
  ).isRequired,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default Dropdown;