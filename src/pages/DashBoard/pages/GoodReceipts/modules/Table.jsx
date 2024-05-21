import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
   addReceiptId,
   removeReceiptId,
   setReceiptDetailsId,
   setReceiptDetailsContent,
   clearReceiptIds
} from '../../../../../redux/receipt/receiptSlice';
import { setDetailsId } from '../../../../../redux/order/orderSlice';
import { formatCurrency, convertISOToDate } from '../../../../../utils/utils';

import { 
   setShowModal,
   setModalContent,
   setModalWidth,
   setModalRounded
 } from '../../../../../redux/modalSlices';

 import ReceiptDetails from './ReceiptDetails';

const Table = ({ initialData }) => {
  const dispatch = useDispatch();
  const selectedGRIds = useSelector(state => state.receipt.selectedReceiptIds);
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      initialData.forEach((item) => {
        if(!selectedGRIds.includes(item.receipt_id)){
          dispatch(addReceiptId(item.receipt_id));
        }
      });
    } else {
      initialData.forEach((item) => {
        dispatch(removeReceiptId(item.receipt_id));
      });
    }
  };

  const handleRowNavigateOrder = (id) => {
    dispatch(setDetailsId(id));
    dispatch(clearReceiptIds());
    navigate('/orders/details')
  }

  const handleRowCheck = (id) => {
    if(!selectedGRIds.includes(id)){
      dispatch(addReceiptId(id));
    }
    else{
      dispatch(removeReceiptId(id));
    }
  }

  const toggleShowDetails = (id) => {
   dispatch(setReceiptDetailsId(id));
   dispatch(setModalRounded(false));
   dispatch(setModalWidth('w-2/3'));
   dispatch(setModalContent(<ReceiptDetails onLeave={hideDetails} />));
   dispatch(setShowModal(true));   
   }

   const hideDetails = () => {
      dispatch(setReceiptDetailsId(''));
      dispatch(setShowModal(false));
      dispatch(setModalContent(null));
      dispatch(setModalWidth('w-[10%]'));
   }
  return (
    <table className='w-full table-auto font-alata'>
      <thead className='tracking-wider text-lg'>
        <tr>
          <th className='p-3 w-5'><input className='w-5 h-5'  type='checkbox' onChange={handleSelectAll} /></th>
          <th className='w-[10%] text-left'>Recipt ID</th>
          <th className='text-center'>Title</th>
          <th className='w-[15%] text-center'>Receipt Date</th>
          <th className='w-[15%] text-center'>Due Date</th>
          <th className='w-[10%] text-center'>Total Items</th>
          <th className='w-[10%] text-center'>Total (VND)</th>
          <th className='w-[10%] text-center'>Order ID</th>
        </tr>
      </thead>
      <tbody>
        {initialData.map((data) => (
          <Row 
          key={data.order_id} 
          data={data} 
          click={(id) => toggleShowDetails(id)}  
          click2={(id) => handleRowNavigateOrder(id)}
          check={(id) => handleRowCheck(id)}
          />
        ))}
      </tbody>
    </table>
  );
};

const Row = ({ data, click, click2, check }) => {
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [totalReceiptMoney, setTotalReceiptMoney] = useState(0);
  const handleClick = () => {
    click(data.receipt_id);
  }

  const handleCheck = (id) => {
    check(id);
  }

  const handleClickOrder = () => {
    click2(data.receipt_order_id);
  }

  useEffect(() => {
   let newTotalCost = 0;
   let newTotalItems = 0;
   
   // for (const material_id in requestBody.material_quantities) {
   //    const quantity = requestBody.material_quantities[material_id];
   //    const material = initialData.order_materials.find(material => material.material_id === material_id);
   //    if (material) {
   //       newTotalCost += material.material_price_per_unit * quantity;
   //    }
   //    newTotalItems += quantity;
   // }
   data.receipt_items.forEach(item => {
      newTotalCost += item.material_price_per_unit;
      newTotalItems += item.material_quantity;
   })
   
   setTotalReceiptMoney(newTotalCost);
   setTotalQuantity(newTotalItems);
   }, [data.receipt_items]);
  
  return (
    <tr className='tracking-wide text-gray-500 hover:text-black hover:cursor-pointer border-y-2 font-alata'>
      <td className='p-3'>
        <input
         type='checkbox' 
         className='w-5 h-5' 
         onChange={() => handleCheck(data.receipt_id)}
         />
      </td>
      <td className='text-left text-black font-semibold hover:underline' onClick={handleClick}>{data.receipt_id}</td>
      <td className='text-center' onClick={handleClick}>{data.receipt_order_title}</td>
      <td className='text-center'>{convertISOToDate(data.receipt_create_date)}</td>
      <td className='text-center'>{data.receipt_order_created_date ? convertISOToDate(data.receipt_order_created_date) : 'N/A'}</td>
      <td className='text-center'>{totalQuantity}</td>
      <td className='text-center'>{formatCurrency(totalReceiptMoney)}</td>
      <td className='text-center text-black font-semibold hover:underline' onClick={handleClickOrder}>{data.receipt_order_id}</td>
    </tr>
  );
};

Table.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object),
};

Row.propTypes = {
  data: PropTypes.object,
  click: PropTypes.func,
  check: PropTypes.func,
  click2: PropTypes.func 
};

export default Table;