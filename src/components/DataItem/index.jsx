import React from 'react';
import PropTypes from 'prop-types';

const DataItem = ({ name, onChange, label, value, type, hasBorder, viewOnly, editable, extraCss, onLostFocus }) => {
    return (
        <div className={"flex items-center place-content-between w-auto whitespace-nowrap " + (extraCss && extraCss)}>
            <label htmlFor={label} className={" " + (!editable && viewOnly ? " font-bold " : (!editable) ? " font-bold " : "font-normal")}>
                {viewOnly ? "" : !editable ? "*" : ""}{label}:
            </label>
            <div className='w-2'>

            </div>
            <div className={hasBorder ? 'border-2 rounded-md ' : ''}>
                <input
                    className={"w-auto text-left p-1 overflow-visible bg-inherit whitespace-nowrap " + (editable ? " borber-b-2 " : " outline-none cursor-not-allowed")}
                    onChange={onChange}
                    name={name}
                    type={type}
                    value={value}
                    readOnly={!editable}
                    title={value}
                    onBlur={onLostFocus}
                />
            </div>
        </div>
    );
};

DataItem.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    hasBorder: PropTypes.bool,
    viewOnly: PropTypes.bool,
    editable: PropTypes.bool,
    extraCss: PropTypes.string,
    onLostFocus: PropTypes.func
};

export default DataItem;
