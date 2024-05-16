import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import xIcon from '../../../../../assets/icons/crud/x_icon.svg'
import DataItem from '../../../../../components/DataItem'
import { convertISOToDate, formatCurrency, formatMaterialQuantity } from '../../../../../utils/utils'
import { ORDER_STATUS } from '../../../../../utils/constant'
import Dropdown from '../../../../../components/DropDown'
import { HeaderButton } from '../../../../../components/ModuleHeader'
import exportIcon from '../../../../../assets/icons/crud/export_button_icon.svg'
import minusIcon from '../../../../../assets/icons/crud/minus_icon.svg'
import plusIcon from '../../../../../assets/icons/crud/plus_icon.svg'
import { exportGR } from '../../../../../redux/receipt/receiptSlice'
import { useDispatch } from 'react-redux'

const ExportReceipt = ({initialData, onLeave}) => {
   const materialQuantities = initialData.order_materials.reduce((acc, material) => {
      acc[material.material_id] = 1;
      return acc;
    }, {});
   const [requestBody, setRequestBody] = useState({
      order_id: initialData.order_id,
      material_quantities: materialQuantities
   });
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [totalReceiptMoney, setTotalReceiptMoney] = useState(0);
   const onChangeQuantity = (material_id, newQuantity) => {
      setRequestBody(prevState => ({
        ...prevState,
        material_quantities: {
          ...prevState.material_quantities,
          [material_id]: newQuantity
        }
      }));
    };

   useEffect(() => {
   let newTotalCost = 0;
   let newTotalItems = 0;
   
   for (const material_id in requestBody.material_quantities) {
      const quantity = requestBody.material_quantities[material_id];
      const material = initialData.order_materials.find(material => material.material_id === material_id);
      if (material) {
         newTotalCost += material.material_price_per_unit * quantity;
      }
      newTotalItems += quantity;
   }
   
   setTotalReceiptMoney(newTotalCost);
   setTotalQuantity(newTotalItems);
   }, [requestBody.material_quantities]);

   const dispatch = useDispatch();

   const handleExport = async () => {
      if(totalQuantity === 0){
         alert('At least 1 item must be exported!');
         return;
      }
      await dispatch(exportGR(requestBody));
      alert('Exported successfully!');
      onLeave();
   }
   

  return (
    <div className='bg-secondary rounded-none'>
      <div className='flex place-content-between mx-5 p-5 pt-10'>
         <div className='font-inter'>
            <span className='font-bold text-3xl'>Good Receipts: </span> <span className='font-light text-3xl'>{initialData.order_title}</span>
         </div>
         <img 
            className='w-6 h-6 cursor-pointer hover:scale-150 transition-all duration-200 ease-in-out'
         src={xIcon} alt="leave" onDoubleClick={onLeave} />
      </div>
      {/* {
          JSON.stringify(initialData)
      } */}
      {
            initialData ?
            <div className='flex place-content-between p-5 text-lg border-b-2 border-black mx-5 font-alata'>
              <div className='column flex-col space-y-2'>
                <DataItem 
                label="Purchase Order ID" 
                value={initialData.order_id}
                type="text"
                viewOnly={true}
                /> 
                <DataItem 
                label="Order Date" 
                name="order_issued_date"
                value={convertISOToDate(initialData.order_issued_date)}
                type="text"
                viewOnly={true}
                /> 
                <DataItem 
                label="Due Date" 
                value={initialData.order_delivery_date === null ? 'Not Given' : convertISOToDate(initialData.order_delivery_date)}
                type="text"
                viewOnly={true}
                /> 
              </div>

              <div className='column flex-col space-y-2'>
              <DataItem 
                label="Vendor ID" 
                name="vendor_address"
                value={initialData.order_vendor_id}
                type="text"
                viewOnly={true}
                /> 
              <DataItem 
                label="Total (VND)" 
                value={formatCurrency(totalReceiptMoney)}
                type="text"
                viewOnly={true}
                /> 
              <DataItem 
                label="Total Items"  
                value={totalQuantity}
                type="text"
                viewOnly={true}
                /> 
              
              </div>
            </div> 
            :
            <div>
              Loading Order Data ...
            </div>
          }

         <div className='w-full h-[50%] px-5 pt-5 mx-5 overflow-y-scroll'>
            <table className='table-auto w-full h-fit mt-5 border-b-2 border-black '>
               <thead className='tracking-wider'>
               <tr>
                  <th className='w-[5%] text-left'>No.</th>
                  <th className=''>Material Name</th>
                  <th className=''>Material ID</th>
                  <th className='w-[10%] text-center items-center'>Quantity</th>
                  <th className='w-[15%]'>Unit of Measure</th>
                  <th className='w-[20%]'>Unit Price (VND)</th>
                  <th className=''>Total Amount</th>
                  {/* <th>Status</th> */}
               </tr>
               </thead>
               <tbody>
               {typeof (initialData) === 'object' ? initialData.order_materials.map((data, index) => (
                  <Row 
                     key={data.entity_id} 
                     data={data} 
                     index={index + 1}
                     onChangeQuantity={onChangeQuantity}
                  />
               ))
                  :
                  'nodata'}
                  {/* {
                     JSON.stringify(initialData)
                  } */}
               </tbody>
            </table>
         </div>
         <div className='flex place-content-between '>
               <div>

               </div>
               <div className='p-5'>
                  <HeaderButton title='export' icon={exportIcon} onClick={handleExport} />
               </div>
         </div>
    </div>
  )
}

ExportReceipt.propTypes = {
   initialData: PropTypes.object,
   onLeave: PropTypes.func
}

export default ExportReceipt

const Row = ({ data, index, onChangeQuantity }) => {
   const id = data.material_id;
   const quantityCapacity = data.material_quantity - data.material_actual_quantity;
   const [quantity, setQuantity] = useState(1);
   const handleChangeQuantity = (e) => {
      let value = e.target.value;
      if (value.includes('-')) {
         alert('Quantity cannot be negative!');
         return;
      }
      // if(value < 1){
      //    alert('Quantity must be greater than 0!');
      //    return;
      // }
      if(value > quantityCapacity){
         alert('Quantity must not exceed the remaining number!');
         return;
      }
      
      setQuantity(parseInt(e.target.value));
      onChangeQuantity(id, parseInt(e.target.value || 0));
   }

   const increment = () => {
      const q = parseInt(quantity)
      if(q === quantityCapacity){
         alert('Quantity must not exceed the remaining number!');
         return;
      }
      onChangeQuantity(id, q + 1);
      setQuantity(q + 1);
   }

   const decrement = () => {
      const q = parseInt(quantity)
      if (q === 0) {
         alert('Quantity must be greater than 0!');
         return;
      }
      onChangeQuantity(id, q - 1);
      setQuantity(q - 1);
   }

   return (
      <tr className='tracking-wide text-gray-600 hover:text-black hover:cursor-default items-center'>
         <td>{index}</td>
         <td className="text-center">{data.material_name}</td>
         <td className='text-center'>{id}</td>
         <td className="flex place-content-between items-center font-bold h-full select-none">
            <img onClick={decrement} src={minusIcon} alt="minus" className='w-3 h-3 cursor-pointer hover:bg-hover1 duration-200 rounded-sm' />
               <input 
                  type="number" 
                  value={quantity}
                  min={0}
                  max={quantityCapacity}
                  onChange={(e) => handleChangeQuantity(e)}
                  placeholder='1'
                  className='w-6 bg-hover2 rounded-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  width={5}
                  
               /> 
               <span className='w-1'>/</span> 
               <span>{formatMaterialQuantity(quantityCapacity)}</span>
            <img onClick={increment} src={plusIcon} alt="plus" className='w-4 h-4 cursor-pointer hover:bg-hover1 duration-200 rounded-sm' />
         </td>
         <td className="text-center">{data.material_unit_of_measure}</td>     
         <td className="text-center p-3">{formatCurrency(data.material_price_per_unit)}</td>
         <td className='text-center'>{formatCurrency(quantity * data.material_price_per_unit)}</td>
      </tr>
   );
};

Row.propTypes = {
   data: PropTypes.object,
   index: PropTypes.number,
   onChange: PropTypes.func,
   isRemovable: PropTypes.bool,
   onRemove: PropTypes.func,
   onChangeQuantity: PropTypes.func
};