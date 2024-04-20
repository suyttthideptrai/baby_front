import React, {useEffect, useState} from 'react'
import Table from './modules/Table';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllVendors
  , toggleHideShowDetailsPopup
  , toggleHideShowUpdateVendorForm 
  , removeVendorDetailsContent
  , deleteVendors
  , clearVendorIds
} from '../../../../redux/vendor/VendorSlice';
import { fetchTypes } from '../../../../redux/material/MaterialSlice';
import DeleteConfirmation from '../../../../components/DeleteConfirmation/DeleteConfirmation';
import Header from '../../../../components/ModuleHeader'
import { HeaderButton } from '../../../../components/ModuleHeader';
import VendorForm from './modules/AddVendorForm'; 

import DeleteIcon from '../../../../assets/icons/crud/delete_icon.svg'
import AddIcon from '../../../../assets/icons/crud/add_icon.svg'
import { 
  setShowModal, 
  setModalContent,
  setModalHeight,
  setModalWidth
 } from '../../../../redux/modalSlices';

const VendorsPage
 = () => {
  const dispatch = useDispatch();
  const vendorIds = useSelector(state => state.vendors.selectedVendorIds);
  const initialData = useSelector(state => state.vendors.vendors);
  const allData = useSelector(state => state.vendors);
  const error = useSelector(state => state.vendors.error);
  const responseMessage = useSelector(state => state.vendors.message);
  const isLoading = useSelector(state => state.vendors.isLoading);

  async function fetchData() {
    await dispatch(fetchAllVendors());
    console.log(allData);
    dispatch(fetchTypes());
  }

  useEffect(() => {
   fetchData();
  }, []);

  //Create new vendor
  const toggleShowCreate = () => {
    dispatch(setModalWidth('w-[55%]'));
    dispatch(
      setModalContent(
        <VendorForm 
        onSuccess={handleSuccessAddingRequest} 
        />
      )
    )
    dispatch(setShowModal(true));
  };


  const handleSuccessAddingRequest = async () => {
    await dispatch(fetchAllVendors());
  }

  //Show vendor Details
  const toggleHideVendorDetails = () => {
    dispatch(toggleHideShowDetailsPopup(false));
    dispatch(removeVendorDetailsContent());
  };

  //Update vendor
  const toggleShowUpdateForm = () => {
    dispatch(toggleHideShowUpdateVendorForm());
  };

  //Delete & delete confirmation
  const toggleDeleteConfirmation = () => {
    if(vendorIds.length == 0){
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
    //setDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    return dispatch(deleteVendors(vendorIds));
  };

  const confirmDelete = async() => {
    try{
      await handleDelete();
      fetchData();
      alert("Vendors deletion successful!")
    }catch(e){
      alert("Error: " + e.message);
    }
    dispatch(clearVendorIds());
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
    <div className='font-alata'>
      {/* {
        JSON.stringify(useSelector(state => state.vendors))
      } */}
      <Header title={"Vendor List"}>
        <HeaderButton 
        title='Delete' 
        icon={DeleteIcon} 
        css={"bg-secondary hover:bg-hover2"} 
        onClick={() => toggleDeleteConfirmation()} />
        <HeaderButton 
        title='Add new vendor' 
        icon={AddIcon} 
        css={"bg-secondary hover:bg-hover2"} 
        onClick={() => toggleShowCreate()}
        />
      </Header>
      {/* {
        showDetailsState
        ?
        <VendorDetails data={vendorDetailsContent} />
        :
        <>
        </>
      } */}
      {
        initialData
        ?
        <Table initialData={initialData} exit={toggleHideVendorDetails} />
        :
        <>loading</>
      }
    </div>
  )
}

export default VendorsPage;
