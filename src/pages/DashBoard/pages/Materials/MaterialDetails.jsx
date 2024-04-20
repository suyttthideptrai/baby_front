import React, {useState} from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import XIcon from '../../../../assets/icons/crud/x_icon.svg'
import DataItem from '../../../../components/DataItem'
import { formatCurrency, formatMaterialQuantity } from '../../../../utils/utils'

const MaterialDetails = ({ data, exit }) => {
  let warehouseDate = null;
  let formattedWarehouseDate = '';
  
  const materialTypes = useSelector(state => state.materials.types);
  const getMaterialGroupName = (groupId) => {
    const materialGroup = materialTypes.find(group => group.type_id === groupId);
    return materialGroup ? materialGroup.type_name.trim() : 'Unknown';
  };


  if (data.material_warehouse_date && !isNaN(Date.parse(data.material_warehouse_date))) {
    warehouseDate = new Date(data.material_warehouse_date);
    formattedWarehouseDate = warehouseDate.toISOString().split('T')[0];
  }

  const handleExit = () => {
    exit();
  }

  return (
    <div className='p-1 h-auto bg-primary font-alata'>
      <div className='flex h-8 text-white place-content-between'>
        <span>
          Material Details
        </span>
        <img className='h-6 cursor-pointer' onClick={handleExit} src={XIcon} alt="" />
      </div>

      <div className='bg-white flex place-content-around space-x-2 p-5'>
        <div className='column space-y-6'>
          <DataItem 
          label="Material ID" 
          value={data.material_id}
          type="text"
          editable={false}
          /> 
          <DataItem 
          label="Material Name" 
          value={data.material_name}
          type="text"
          editable={false}
          /> 
          <DataItem 
          label="Material Group" 
          value={getMaterialGroupName(data.material_type)}
          type="text"
          editable={false}
          /> 
        </div>

        <div className='column space-y-6'>
        <DataItem 
          label="Unit Of Measure"  
          value={data.material_unit_of_measure}
          type="text"
          editable={false}
          /> 
        <DataItem 
          label="Warehouse Date" 
          value={formattedWarehouseDate}
          type="date"
          editable={false}
          /> 
        <DataItem 
          label="Vendor" 
          value={data.material_vendor_name}
          type="text"
          editable={false}
          /> 
        </div>

        <div className='column space-y-6'>
          <DataItem 
          label="Quantity" 
          value={formatMaterialQuantity(data.material_quantity)}
          type="text"
          editable={false}
          /> 
          <div>

          </div>
          <DataItem 
          label="Price(VND)" 
          value={formatCurrency(data.material_price)}
          type="text"
          currency="VND"
          editable={false}
          /> 
        </div>

      </div>
    </div>
  )
}

export default MaterialDetails;

MaterialDetails.propTypes = {
  data: propTypes.array,
  exit: propTypes.func
}

