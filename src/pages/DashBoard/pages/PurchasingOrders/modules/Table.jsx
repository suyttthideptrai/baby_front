import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  setDetailsId,
  addOrderId,
  removeOrderId,
  clearOrderIds, 
  fetchOrderDetails
} from '../../../../../redux/order/orderSlice';
import { setVendorDetailsId } from '../../../../../redux/vendor/VendorSlice';
import { formatCurrency, convertISOToDate } from '../../../../../utils/utils';
import StatusCell from '../../../../../components/StatusCell';
import { ORDER_STATUS } from '../../../../../utils/constant';

const Table = ({ initialData }) => {
  const dispatch = useDispatch();
  const selectedOrderIds = useSelector(state => state.orders.selectedOrderIds);
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      initialData.forEach((item) => {
        if(!selectedOrderIds.includes(item.order_id)){
          dispatch(addOrderId(item.order_id));
        }
      });
    } else {
      initialData.forEach((item) => {
        dispatch(removeOrderId(item.order_id));
      });
    }
  };

  const handleRowNavigate = (id) => {
    dispatch(setDetailsId(id));
    dispatch(clearOrderIds());
    navigate('/orders/details')
  }

  const handleRowNavigateVendor = async (id) => {
    
    await dispatch(setVendorDetailsId(id));
    dispatch(clearOrderIds());
    navigate('/vendors/details')
  }

  const handleRowCheck = (id) => {
    if(!selectedOrderIds.includes(id)){
      dispatch(addOrderId(id));
    }
    else{
      dispatch(removeOrderId(id));
    }
  }
  return (
    <table className='w-full table-auto font-alata'>
      <thead className='tracking-wider text-lg'>
        <tr>
          <th className='p-3 w-5'><input className='w-5 h-5'  type='checkbox' onChange={handleSelectAll} /></th>
          <th className='w-[10%] text-left'>Order ID</th>
          <th className='text-center'>Title</th>
          <th className='w-[15%] text-center'>Start Date</th>
          <th className='w-[15%] text-center'>Due Date</th>
          <th className='w-[10%] text-center'>Total Price</th>
          <th className='w-[10%] text-center'>Status</th>
          <th className='w-[10%] text-center'>Vendor ID</th>
        </tr>
      </thead>
      <tbody>
        {initialData.map((data) => (
          <Row 
          key={data.order_id} 
          data={data} 
          click={(id) => handleRowNavigate(id)}  
          click2={(id) => handleRowNavigateVendor(id)}
          check={(id) => handleRowCheck(id)}
          />
        ))}
      </tbody>
    </table>
  );
};

const Row = ({ data, click, click2, check }) => {
  const handleClick = () => {
    click(data.order_id);
  }

  const handleCheck = (id) => {
    check(id);
  }

  const handleClickVendor = () => {
    click2(data.order_vendor_id);
  }

  return (
    <tr className='tracking-wide text-gray-600 hover:text-black hover:cursor-pointer border-y-2 font-alata'>
      <td className='p-3'>
        <input
         type='checkbox' 
         className='w-5 h-5' 
         onChange={() => handleCheck(data.order_id)}
         />
      </td>
      <td className='text-left text-black font-semibold hover:underline' onClick={handleClick}>{data.order_id}</td>
      <td onClick={handleClick} className='text-center'>{data.order_title}</td>
      <td className='text-center'>{convertISOToDate(data.order_date)}</td>
      <td className='text-center'>{data.order_due_date ? convertISOToDate(data.order_due_date) : 'N/A'}</td>
      <td className='text-center'>{formatCurrency(data.order_total_price)}</td>
      <td className='text-center'>
        <StatusCell 
        isRounded={false} 
        statusData={ORDER_STATUS} 
        statusCode={data.order_status} 
        />
      </td>
      <td className='text-center text-black font-semibold hover:underline' onClick={handleClickVendor}>{data.order_vendor_id}</td>
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