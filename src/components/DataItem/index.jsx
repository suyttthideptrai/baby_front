import React from 'react';
import PropTypes from 'prop-types';

const DataItem = ({ name, onChange, label, value, type, currency, viewOnly, editable, extraCss }) => {
    return (
        <div className={"flex items-center place-content-between text-[#667085]" + (extraCss && extraCss)}>
            <label htmlFor={label} className={" " + (!editable && viewOnly ? " font-normal " : (!editable) ? " font-bold " : "font-normal")}>
                {viewOnly ? "" : !editable ? "*" : ""}{label}:
            </label>
            <div className='w-2'>

            </div>
            <input
                className={"w-auto p-1 overflow-visible bg-inherit " + (editable ? " borber-b-2 " : " outline-none cursor-not-allowed")}
                onChange={onChange}
                name={name}
                type={type}
                value={value}
                readOnly={!editable}
                title={value}
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
    viewOnly: PropTypes.bool,
    editable: PropTypes.bool,
    extraCss: PropTypes.string
};

export default DataItem;
