import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../../../redux/order/orderSlice'
import Table from './modules/Table'
import Header, { HeaderButton } from '../../../../components/ModuleHeader'
import { useNavigate } from 'react-router-dom'

import DeleteIcon from '../../../../assets/icons/crud/delete_icon.svg'
import AddIcon from '../../../../assets/icons/crud/add_icon.svg'

import DeleteConfirmation from '../../../../components/DeleteConfirmation/DeleteConfirmation'
import { 
  deleteOrders,
  addOrderId,
  removeOrderId,
  clearOrderIds
 } from '../../../../redux/order/orderSlice'

import { 
  setShowModal, 
  setModalContent,
  setModalHeight,
  setModalWidth
 } from '../../../../redux/modalSlices';

const PurchasingOrdersPage = () => {
  const selectedIds = useSelector(state => state.orders.selectedOrderIds)
  const orderData = useSelector(state => state.orders.orders)
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [])

  const toggleDeleteConfirmation = () => {
    if(selectedIds.length == 0){
      alert('Please, choose checkboxes whose you want to delete.')
      return;
    }
    dispatch(setModalWidth('w-[280px]'));
    dispatch(setModalHeight('h-[150px]'));
    dispatch(setModalContent(
      <DeleteConfirmation 
            text={"Are you sure to remove?"} 
            yes={confirmDelete} 
            no={cancelDelete} 
      />
    ))
    dispatch(setShowModal(true));
  };

  const handleDelete = async () => {
    return dispatch(deleteOrders(selectedIds));
  };

  const confirmDelete = async() => {
    try{
      await handleDelete();
      dispatch(fetchOrders());
      alert("Purchase Orders deleted successfully!")
    }catch(e){
      alert("Error: " + e.message);
    }
    dispatch(clearOrderIds());
    dispatch(setModalContent(null));
    dispatch(setShowModal(false));
    //setDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    dispatch(setModalContent(null));
    dispatch(setShowModal(false));
    //setDeleteConfirmation(false);
  };

  return (
    <div>
      <Header title={"Purchase Orders"}>
        <HeaderButton 
        title='Delete' 
        icon={DeleteIcon} 
        css={"bg-secondary hover:bg-hover2"} 
        onClick={() => toggleDeleteConfirmation()} />
        <HeaderButton 
        title='Add New PO' 
        icon={AddIcon} 
        css={"bg-secondary hover:bg-hover2"} 
        onClick={() => navigate('/orders/new')}
        />
      </Header>
      {/* {
        JSON.stringify(selectedIds)
      } */}
      {
        orderData && <Table initialData={orderData} />
      }
    </div>
  )
}

export default PurchasingOrdersPage
PurchasingOrdersPage.propTypes = {

}