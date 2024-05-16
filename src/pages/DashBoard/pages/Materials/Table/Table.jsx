import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import { useDispatch } from 'react-redux';
import { addId, removeId } from '../../../../../redux/material/selectedIdsSlice';

const Table = ({ initialData }) => {

  const dispatch = useDispatch();

  const [filter, setFilter] = useState('all'); // new state variable for the filter

  const filteredData = initialData.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'available' && item.material_quantity > 0) return true;
    if (filter === 'notExist' && item.material_quantity === -1) return true;
    return false;
  });

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
      <div onChange={e => setFilter(e.target.value)}
        className='pl-3 flex place-content-between w-[30%]'
      >
        <label>
          <input type="radio" value="all" checked={filter === 'all'} className='mr-2 '/>
          <span className='text-gray-500'>All materials</span>
        </label>
        <label>
          <input type="radio" value="available" checked={filter === 'available'} className='mr-2 ' />
          <span className='text-gray-500'>Available</span>
        </label>
        <label>
          <input type="radio" value="notExist" checked={filter === 'notExist'} className='mr-2 ' />
          <span className='text-gray-500'>Not exist</span>
        </label>
      </div>
      <table className='table-auto w-full'>
        <thead className='tracking-wider'>
          <tr className='text-xl'>
            <th className='w-10 p-3'><input className='w-5 h-5' type="checkbox" onChange={handleSelectAll}/></th>
            <th className='w-[12%] text-left'>Material ID</th>
            <th className='text-left'>Material Name</th>
            <th className='w-[15%] text-left'>Unit of Measure</th>
            <th className='w-[20%] text-center'>Available Quantity</th>
            <th className='w-auto text-center'>Group</th>
          </tr>
        </thead>
        <tbody id="checkbox-container">
          {filteredData.map(item => (
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
