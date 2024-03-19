// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ icon, id, type, label, required, onChange }) => {
  return (
    <div className="rounded-[16px]
    bg-[rgba(240,237,255,0.8)]
    relative
    m-[0_35px_22px_35px]
    flex
    flex-row
    self-start
    gap-1
    p-[15px_0_16px_21px]
    w-[364px]
    box-sizing-border
    ">
      <div className=' m-[0_9px_0_0]
flex
flex-row
justify-center
w-[18px]
h-[21px]
box-sizing-border'>
          <img className='w-[18px]
h-[21px]' src={icon} alt="" />
      </div>
      <label>{label}</label>
      <input id={id} className='bg-transparent outline-none'
        type={type} required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default TextInput;
