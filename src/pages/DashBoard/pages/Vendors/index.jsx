import React, {useEffect, useState} from 'react'
import Table from './modules/Table';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllVendors
  , toggleHideShowCreateVendorForm
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

const VendorsPage
 = () => {
  const dispatch = useDispatch();
  const vendorIds = useSelector(state => state.vendors.selectedVendorIds);
  const showCreateForm = useSelector(state => state.vendors.showCreateVendorForm);
  const initialData = useSelector(state => state.vendors.vendors);
  const allData = useSelector(state => state.vendors);
  const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);
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
    dispatch(toggleHideShowCreateVendorForm(true));
  };

  const toggleHideCreate = () => {
    dispatch(toggleHideShowCreateVendorForm(false));
  };

  const handleSuccessAddingRequest = async () => {
    await dispatch(fetchAllVendors());
    toggleHideCreate();
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
    setDeleteConfirmation(true);
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
    setDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
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
      {/* Delete Confirmation */}
      <div className={`transition-opacity duration-500 ${showDeleteConfirmation ? '' : 'opacity-0 pointer-events-none'}`}>
          {showDeleteConfirmation && (
            <DeleteConfirmation 
            text={"Are you sure to remove?"} 
            yes={confirmDelete} 
            no={cancelDelete} />
          )}
      </div>

      <div className={`transition-opacity duration-500 ${showCreateForm ? '' : 'opacity-0 pointer-events-none'}`}>
        {
          showCreateForm
          ?
          <VendorForm onSuccess={handleSuccessAddingRequest} click={toggleHideCreate} />
          :
          <></>
        }
      </div>
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
