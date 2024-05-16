import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../../../../components/DropDown';
import { ORDER_MATERIAL_STATUS } from '../../../../../utils/constant';
import { formatCurrency } from '../../../../../utils/utils';
import StatusCell from '../../../../../components/StatusCell';

const DetailsTable = ({ initialData }) => {
  return (
    <div className='w-full h-[50%] p-5 overflow-y-scroll font-alata'>
        <table className='table-auto w-full'>
          <thead className='tracking-wider select-none'>
            <tr>
              <th className='text-left'>No.</th>
              <th>Material Name</th>
              <th>Unit of Measure</th>
              <th>Quantity</th>
              <th>Delivered</th>
              <th>Unit Price (VND)</th>
              <th>Status</th>
            </tr>
          </thead>
        <tbody>
          {typeof (initialData) === 'object' ? initialData.map((data, index) => (
            <Row key={data.material_name} data={data} index={index + 1} />
          ))
            :
            'nodata'}
        </tbody>
      </table>
    </div>
  );
};

const Row = ({ data, index }) => {
  return (
    <tr className='tracking-wide text-gray-600 hover:text-black border-y-2'>
      <td className='text-left'>{index}</td>
      <td className='text-center'>{data.material_name}</td>
      <td className='text-center'>{data.material_unit_of_measure}</td>
      <td className='text-center'>{data.material_quantity}</td>
      <td className='text-center'>{data.material_actual_quantity}</td>
      <td className='text-center'>{formatCurrency(data.material_price_per_unit)}</td>
      <td className='h-10 w-[15%]'>
        <div className='px-5 h-full'>
          <StatusCell 
            statusData={ORDER_MATERIAL_STATUS} 
            isRounded={true} 
            statusCode={data.material_status} 
          />
        </div>
      </td>
    </tr>
  );
};

DetailsTable.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object),
};

Row.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

export default DetailsTable;