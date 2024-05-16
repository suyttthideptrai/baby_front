import React, {useEffect} from 'react'
import { fetchGR } from '../../../../redux/receipt/receiptSlice';
import Table from './modules/Table'
import Header, { HeaderButton } from '../../../../components/ModuleHeader'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import DeleteIcon from '../../../../assets/icons/crud/delete_icon.svg'
import DeleteConfirmation from '../../../../components/DeleteConfirmation/DeleteConfirmation'

import { deleteReceipts, clearReceiptIds } from '../../../../redux/receipt/receiptSlice';

import { 
  setShowModal, 
  setModalContent,
  setModalHeight,
  setModalWidth
 } from '../../../../redux/modalSlices';
const GoodReceiptsPage = () => {
  const selectedIds = useSelector(state => state.receipt.selectedReceiptIds)
  const receiptData = useSelector(state => state.receipt.receipts)
  const dispatch = useDispatch();  
  
  useEffect(() => {
    dispatch(fetchGR());
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
    return dispatch(deleteReceipts(selectedIds));
  };

  const confirmDelete = async() => {
    try{
      await handleDelete();
      dispatch(fetchGR());
      alert("Receipts deleted successfully!")
    }catch(e){
      alert("Error: " + e.message);
    }
    dispatch(clearReceiptIds());
    dispatch(setModalContent(null));
    dispatch(setShowModal(false));
  };

  const cancelDelete = () => {
    dispatch(setModalContent(null));
    dispatch(setShowModal(false));
  };

  
  
  return (
    <div>
      {/* {JSON.stringify(receiptData)} */}
      <Header title={"Goods Receipt List"}>
        <HeaderButton 
        title='Delete' 
        icon={DeleteIcon} 
        css={"bg-secondary hover:bg-hover2"} 
        onClick={() => toggleDeleteConfirmation()} />

      </Header>
      {/* {
        JSON.stringify(selectedIds)
      } */}
      {
        receiptData && <Table initialData={receiptData} />
      }
    </div>
  )
}

export default GoodReceiptsPage;