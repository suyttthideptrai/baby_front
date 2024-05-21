import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {
    addVendorId
    , removeVendorId
    , setVendorDetailsContent
} from '../../../../../redux/vendor/VendorSlice';

import Status from './Status';
import StatusCell from '../../../../../components/StatusCell';
import { VENDOR_STATUS } from '../../../../../utils/constant';

const Table = ({initialData}) => {

  const dispatch = useDispatch();
  const IDS = useSelector((state) => state.vendors.selectedVendorIds);
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      initialData.forEach((item) => {
        if(!IDS.includes(item.vendor_id)){
          dispatch(addVendorId(item.vendor_id));
        }
      });
    } else {
      initialData.forEach((item) => {
        dispatch(removeVendorId(item.vendor_id));
      });
    }
  };
  

  return (
    <div className='w-full overflow-auto'>
    
      <table className='table-auto w-full'>
        <thead className='tracking-wider'>
          <tr className='text-xl'>
            <th className='w-10 p-3'><input className='w-5 h-5' type="checkbox" onChange={handleSelectAll}/></th>
            <th className='w-[10%] text-left'>Vendor ID</th>
            <th className='w-[15%] text-left'>Vendor Name</th>
            <th className='w-[15%] text-left'>Phone</th>
            <th className='w-[15%] text-left'>Email</th>
            <th className='w-auto'>Suppiled Type(s)</th>
            <th className='w-[10%]'>Status</th>
          </tr>
        </thead>
        <tbody id="checkbox-container">
          {initialData.map(item => (
            <Row
              key={item.vendor_id}
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

const Row = ({ data }) => {

    // const materialTypes = useSelector(state => state.materials.types);
    const selectedIds = useSelector(state => state.vendors.selectedVendorIds);
    const navigator = useNavigate();
    const dispatch = useDispatch();
  
    //material types
    // const getMaterialGroupName = (groupId) => {
    //   const materialGroup = materialTypes.find(group => group.type_id === groupId);
    //   return materialGroup ? materialGroup.type_name.trim() : 'Unknown';
    // };
  
    //selected Ids
    const handleChecked = (id) => {
      console.log('handling check with redux: ' + id)
      if(!selectedIds.includes(id)){
        dispatch(addVendorId(id))
      }else{
        dispatch(removeVendorId(id));
      }
    }

    const goToDetails = () => {
      navigator('/vendors/details');
    }
    //show vendor details
    const toggleShowVendorDetails = () => {
        dispatch(setVendorDetailsContent(data));
        //dispatch(toggleHideShowDetailsPopup(true));
        goToDetails();
      };
    
  
  return (
      <tr className="tracking-wide text-gray-600 hover:text-black hover:cursor-pointer border-y-2">
        
        <td className="pl-3">
          <input className='w-5 h-5'
            type="checkbox"
            name="product-id"
            onChange={() => handleChecked(data.vendor_id)}
          />
        </td>
        <td onClick={toggleShowVendorDetails} className="text-black text-left font-semibold hover:underline">{data.vendor_id}</td>
        <td onClick={toggleShowVendorDetails} className="text-left">{data.vendor_name}</td>
        <td className="text-left">{data.vendor_phone}</td>
        <td className="text-left">{data.vendor_email}</td>
        <td className="text-center">{data.vendor_supplied_types.join(', ')}</td>
        <td className="text-center p-3 text-lg">
          <StatusCell 
            statusData={VENDOR_STATUS}
            statusCode={data.vendor_status}
            isRounded={false} 
          />
        </td>
      </tr>
    );
  };
  
Row.propTypes = {
data: PropTypes.shape({
    vendor_id: PropTypes.number.isRequired,
    vendor_name: PropTypes.string.isRequired,
    vendor_phone: PropTypes.string.isRequired,
    vendor_status: PropTypes.string.isRequired,
    vendor_email: PropTypes.string.isRequired,
    vendor_supplied_types: PropTypes.array.isRequired
}).isRequired,
toggleChecked: PropTypes.func,
isChecked: PropTypes.bool
};

export default Table;
