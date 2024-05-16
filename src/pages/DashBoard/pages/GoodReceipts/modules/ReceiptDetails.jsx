import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { formatCurrency, convertISOToDate } from '../../../../../utils/utils'
import xIcon from '../../../../../assets/icons/crud/x_icon.svg'
import { fetchGRById } from '../../../../../redux/receipt/receiptSlice'
import DataItem from '../../../../../components/DataItem'
const ReceiptDetails = ({onLeave}) => {
  const selectedId = useSelector(state => state.receipt.receiptDetailsId);
  const receiptData = useSelector(state => state.receipt.receiptDetails);
  const dispatch = useDispatch();

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalReceiptMoney, setTotalReceiptMoney] = useState(0);

  useEffect(() => {
    dispatch(fetchGRById(selectedId));
    // console.log(receiptData);
  }, [selectedId])
  useEffect(() => {
    if(receiptData && receiptData.receipt_items){
      let newTotalCost = 0;
      let newTotalItems = 0;

      receiptData.receipt_items.forEach(item => {
        newTotalCost += item.material_price_per_unit;
        newTotalItems += item.material_quantity;
      })
      
      setTotalReceiptMoney(newTotalCost);
      setTotalQuantity(newTotalItems);
    }
    }, [receiptData]);
  return (
    <div className='bg-secondary rounded-none'>
      <div className='flex place-content-between mx-5 p-5 pt-10'>
         <div className='font-inter'>
            <span className='font-bold text-3xl'>Good Receipts: </span> {receiptData ? <span className='font-light text-3xl'>{receiptData.receipt_order_title}</span> : 'Loading...'}
         </div>
         <img 
            className='w-6 h-6 cursor-pointer hover:scale-150 transition-all duration-200 ease-in-out'
         src={xIcon} alt="leave" onDoubleClick={onLeave} />
      </div>
      {/* {
          JSON.stringify(receiptData)
      } */}
      {
            receiptData && receiptData.receipt_items ?
            <div className='flex place-content-between p-5 text-lg border-b-2 border-black mx-5 font-alata'>
              <div className='column flex-col space-y-2'>
                <DataItem 
                label="Purchase Order ID" 
                value={receiptData.receipt_order_id}
                type="text"
                viewOnly={true}
                /> 
                <DataItem 
                label="Order Date" 
                name="order_issued_date"
                value={convertISOToDate(receiptData.receipt_order_created_date)}
                type="text"
                viewOnly={true}
                /> 
                <DataItem 
                label="Due Date" 
                value={receiptData.receipt_order_due_date === null ? 'Not Given' : convertISOToDate(receiptData.receipt_order_due_date)}
                type="text"
                viewOnly={true}
                /> 
              </div>

              <div className='column flex-col space-y-2'>
              <DataItem 
                label="Vendor ID" 
                name="vendor_address"
                value={receiptData.receipt_vendor_id}
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

         <div className='w-full h-[50%] px-5 pt-5 mx-5 overflow-y-scroll pb-10'>
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
               {receiptData && receiptData.receipt_items ? receiptData.receipt_items.map((data, index) => (
                  <Row 
                     key={data.material_id} 
                     data={data} 
                     index={index + 1}
                  />
               ))
                  :
                  'nodata'} 
               </tbody>
            </table>
         </div>
    </div>
  )
}

ReceiptDetails.propTypes = {
  onLeave: PropTypes.func
}

export default ReceiptDetails


const Row = ({ data, index }) => {
  const id = data.material_id;
  //const quantityCapacity = data.material_quantity - data.material_actual_quantity;
  

  return (
     <tr className='tracking-wide text-gray-600 hover:text-black hover:cursor-default items-center'>
        <td>{index}</td>
        <td className="text-center">{data.material_name}</td>
        <td className='text-center'>{id}</td>
        <td className="text-center">{data.material_quantity}</td>
        <td className="text-center">{data.material_unit_of_measure}</td>     
        <td className="text-center p-3">{formatCurrency(data.material_price_per_unit)}</td>
        <td className='text-center'>{formatCurrency(data.material_quantity * data.material_price_per_unit)}</td>
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