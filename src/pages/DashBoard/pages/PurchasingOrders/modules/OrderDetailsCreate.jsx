import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Header, { HeaderButton } from '../../../../../components/ModuleHeader'
import DataItem from '../../../../../components/DataItem'
import Dropdown from '../../../../../components/DropDown'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderDetails } from '../../../../../redux/order/orderSlice'
import { ORDER_STATUS } from '../../../../../utils/constant'
import DetailsTable from './DetailsTable'
import { formatCurrency, convertISOToDate } from '../../../../../utils/utils'
import exportIcon from '../../../../../assets/icons/crud/export_button_icon.svg'

import {
  setShowModal, setModalContent, setModalWidth, setModalRounded
} from '../../../../../redux/modalSlices';
import ExportReceipt from './ExportReceipt'
import StatusCell from '../../../../../components/StatusCell'

const OrderDetailsCreate = () => {
  const dispatch = useDispatch();
  const detailsData = useSelector(state => state.orders.orderDetails);
  const detailsId = useSelector(state => state.orders.detailsId);
  const navigate = useNavigate();
  useEffect(() => {
    if(detailsId !== null){
      dispatch(fetchOrderDetails(detailsId));
    }else{
      navigate('/orders');
    }
  }, [detailsId])

  const showExportGR = () => {
    if(checkQuantities(detailsData) === true){
      alert('All items have been received');
      return;
    }
    dispatch(setModalContent(
      <ExportReceipt 
        initialData={detailsData} 
        onLeave={hideExportGR}
      />
    ));
    dispatch(setShowModal(true));
    dispatch(setModalWidth('w-2/3'));
    dispatch(setModalRounded(false));
  }

  const hideExportGR = () => {
    dispatch(fetchOrderDetails(detailsId));
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
    dispatch(setModalWidth('w-[10%]'));
  }

  function checkQuantities(data) {
    if (!data || !Array.isArray(data.order_materials)) {
      return false;
    }
  
    let totalQuantity = 0;
    let totalActualQuantity = 0;
  
    for (const material of data.order_materials) {
      totalQuantity += material.material_quantity;
      totalActualQuantity += material.material_actual_quantity;
    }
  
    return totalQuantity === totalActualQuantity;
  }

  return (
    <div>
          <Header title={                
            <span>
              <Link className='hover:underline' to={'/orders'}>{"Purchase Orders "}</Link>
                / <span className='font-light'> {detailsData.order_title}</span>               
            </span>
          }>
            <HeaderButton title='Export GR' icon={exportIcon} onClick={showExportGR} />
          </Header>
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
              <div className='flex items-center place-content-between w-auto'>
                <label className='w-auto font-bold'>Status:</label>
                <div className=' w-1/2 h-full'>
                  <StatusCell 
                    isRounded={true}
                    statusData={ORDER_STATUS}
                    statusCode={detailsData.order_status}
                  />
                </div>
                <div className='w-2'>

                </div>
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