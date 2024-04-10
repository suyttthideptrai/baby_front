import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import { useDispatch } from 'react-redux';
import { addId, removeId } from '../../../../../redux/material/selectedIdsSlice';

const Table = ({ initialData }) => {

  const dispatch = useDispatch();

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      initialData.forEach((item) => {
        dispatch(addId(item.material_id));
      });
    } else {
      initialData.forEach((item) => {
        dispatch(removeId(item.material_id));
      });
    }
  };
  

  return (
    <div className='w-full overflow-auto'>
      <table className='table-auto w-full'>
        <thead className='tracking-wider'>
          <tr>
            <th className='w-10 p-3'><input className='w-5 h-5' type="checkbox" onChange={handleSelectAll}/></th>
            <th className='w-[10%] text-left'>Material ID</th>
            <th className='w-[20%] text-left'>Material Name</th>
            <th className='w-[20%] text-left'>Unit of Measure</th>
            <th className='w-[20%] text-left'>Available Quantity</th>
            <th className='w-auto text-center'>Group</th>
          </tr>
        </thead>
        <tbody id="checkbox-container">
          {initialData.map(item => (
            <Row
              key={item.material_id}
              data={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  initialData: PropTypes.array.isRequired,
};

export default Table;
