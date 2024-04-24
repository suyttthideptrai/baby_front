import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../pages/DashBoard/pages/Vendors/modules/Status';
import { getColor } from '../../utils/utils';

const Dropdown = ({ options, selectedOption, onChange, editable }) => {
    
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  if (editable) {
    return (
      <select
        className={'border-2 bg-hover2 rounded-lg w-[40%] h-10 ' + getColor(selectedOption)}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.type_id} value={option.type_id} className={getColor(option.type_name)}>
            {option.type_name}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <div className='flex border-2 bg-hover2 rounded-lg pr-8 pl-1 cursor-not-allowed h-10 items-center text-left w-[40%]'>
        <Status status={options.find((option) => option.type_id === selectedOption)?.type_name} />
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
