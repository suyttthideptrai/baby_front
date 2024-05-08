import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from '../../../../../components/ModuleHeader'
import DataItem from '../../../../../components/DataItem'
import Dropdown from '../../../../../components/DropDown'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderDetails } from '../../../../../redux/order/orderSlice'
import { ORDER_STATUS } from '../../../../../utils/constant'
import DetailsTable from './DetailsTable'
import { formatCurrency, convertISOToDate } from '../../../../../utils/utils'

const OrderDetailsCreate = () => {
  const dispatch = useDispatch();
  const detailsData = useSelector(state => state.orders.orderDetails);
  const detailsId = useSelector(state => state.orders.detailsId);
  useEffect(() => {
    if(detailsId !== null){
      dispatch(fetchOrderDetails(detailsId));
    }
  }, [dispatch, detailsId])
  return (
    <div>
          <Header title={                
            <span>
              <Link className='hover:underline' to={'/orders'}>{"Purchase Orders "}</Link>
                / <span className='font-light'> {detailsData.order_title}</span>               
            </span>
          } />
          {
            /*
              ORDER DETAILS SECTION
            */
            detailsData ?
            <div className='flex place-content-between bg-hover2 bg-opacity-50 p-10 text-lg font-alata'>
              <div className='column flex-col space-y-2'>
                <DataItem 
                label="Purchase Order ID" 
                value={detailsData.order_id}
                type="text"
                //editable={false}
                viewOnly={true}
                /> 
                <DataItem 
                label="Order Title" 
                name="order_title"
                value={detailsData.order_title}
                //onChange={handleChange}
                type="text"
                viewOnly={true}
                //editable={editable}
                //viewOnly={!editable}
                /> 
                <DataItem 
                label="Start Date" 
                name="order_issued_date"
                value={convertISOToDate(detailsData.order_issued_date)}
                //onChange={handleChange}
                type="text"
                viewOnly={true}
                //editable={editable}
                //viewOnly={!editable}
                /> 
                <DataItem 
                label="Due Date" 
                name="vendor_phone"
                value={detailsData.order_delivery_date === null ? 'Not Given' : convertISOToDate(detailsData.order_delivery_date)}
                //onChange={handleChange}
                type="text"
                viewOnly={true}
                //editable={editable}
                //viewOnly={!editable}
                /> 
              </div>

              <div className='column flex-col space-y-2'>
              <DataItem 
                label="Total Price" 
                name="vendor_email"
                value={formatCurrency(detailsData.order_total_price)}
                //onChange={handleChange}
                type="text"
                viewOnly={true}
                //editable={editable}
                //viewOnly={!editable}
                /> 
              <DataItem 
                label="Total Items"  
                name="vendor_tax_code"
                value={typeof(detailsData.order_materials) === 'object' ? detailsData.order_materials.reduce((total, material) => total + material.material_quantity, 0) : 0}
                //onChange={handleChange}
                type="text"
                viewOnly={true}

                // editable={editable}
                // viewOnly={!editable}
                /> 
              <div className='flex place-content-between transition-all duration-200 ease-in-out'>
                <label className='min-w-40'>Status:</label>
                <Dropdown 
                options={ORDER_STATUS} 
                editable={false}
                selectedOption={detailsData.order_status}  
                // onChange={handleDropdownChange} 
                />
              </div>
              <DataItem 
                label="Vendor ID" 
                name="vendor_address"
                value={detailsData.order_vendor_id}
                //onChange={handleChange}
                type="text"
                viewOnly={true}
                //editable={editable}
                //viewOnly={!editable}
                /> 
              </div>
            </div> 
            :
            <div>
              Loading Order Data ...
            </div>
          }
          {
            detailsData &&
            <DetailsTable initialData={detailsData.order_materials} />
          }
    </div> 
  )
}

OrderDetailsCreate.propTypes = {
  
}

export default OrderDetailsCreate