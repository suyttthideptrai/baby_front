import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ id, label, name, value, onChange, required, type }) => {
  return (
    <div className='
    flex 
    place-content-between
    items-center 
    flex-nowrap 
    p-2 
    font-alata 
    space-x-3
    '>
      <label className='w-[45%] text-nowrap text-[#667085]' htmlFor={id} >{required ? "*" : "" }{label}:</label>
      <input className={'border-2 bg-[#f4f5f7] w-[45%] h-8 text-sm' }
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    type: PropTypes.string
  };


export default FormInput;
