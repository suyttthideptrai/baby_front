import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ id, label, name, value, onChange, required, type }) => {
  return (
    <div className='flex mt-2 ml-5 place-content-between'>
      <label className='font-bold w-auto' htmlFor={id}>{label}{required ? " (*)" : "" } :</label>
      <input className={'border-2 bg-[#f4f5f7] w-auto h-10'}
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
