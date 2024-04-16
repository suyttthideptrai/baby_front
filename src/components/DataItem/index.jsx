import React from 'react';
import PropTypes from 'prop-types';

const DataItem = ({ name, onChange, label, value, type, currency, bold, editable }) => {
    return (
        <div className='flex place-content-between'>
            <label htmlFor={label} className={" " + (bold ? " font-bold marker:" : " ")}>
                {label}:
            </label>
            <div className='w-2'>

            </div>
            <input
                className={"w-1/2 p-1 bg-hover2 " + (editable ? " borber-b-2 " : " outline-none cursor-not-allowed")}
                onChange={onChange}
                name={name}
                type={type}
                value={value}
                readOnly={!editable}
            />
        </div>
    );
};

DataItem.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    currency: PropTypes.string,
    bold: PropTypes.bool,
    editable: PropTypes.bool
};

export default DataItem;
