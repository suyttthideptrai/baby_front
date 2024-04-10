import React, {useEffect, useState} from 'react'
import Table from './modules/Table';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllVendors
  , toggleHideShowCreateVendorForm
  , toggleHideShowDetailsPopup
  , toggleHideShowUpdateVendorForm 
  , removeVendorDetailsContent
  , setVendorDetailsContent
} from '../../../../redux/material/VendorSlice';
import { fetchTypes } from '../../../../redux/material/MaterialSlice';
import DeleteConfirmation from '../../../../components/DeleteConfirmation/DeleteConfirmation';
import Header from '../../../../components/ModuleHeader'
import { HeaderButton } from '../../../../components/ModuleHeader';
import VendorDetails from './modules/VendorDetails';
import VendorForm from './modules/AddVendorForm'; 

import DeleteIcon from '../../../../assets/icons/crud/delete_icon.svg'
import AddIcon from '../../../../assets/icons/crud/add_icon.svg'

const VendorsPage
 = () => {
  const dispatch = useDispatch();
  // const loaded = useSelector(state => state.vendors.vendorsDataLoaded);
  const vendorDetailsContent = useSelector(state => state.vendors.vendorDetailsContent);
  const showDetailsState = useSelector(state => state.vendors.showVendorDetailsPopup);
  const showCreateForm = useSelector(state => state.vendors.showCreateVendorForm);
  const showUpdateForm = useSelector(state => state.vendors.showUpdateVendorForm);
  const initialData = useSelector(state => state.vendors.vendors);
  const allData = useSelector(state => state.vendors);
  const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);


  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchAllVendors());
      console.log(allData);
      dispatch(fetchTypes());
    }
   fetchData();
  }, []);

  //Create new vendor
  const toggleShowCreate = () => {
    dispatch(toggleHideShowCreateVendorForm(true));
  };

  const toggleHideCreate = () => {
    dispatch(toggleHideShowCreateVendorForm(false));
  };

  const handleSuccessAddingRequest = () => {
    dispatch(fetchAllVendors());
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
    setDeleteConfirmation(true);
  };

  const handleDelete = () => {
    try {
      // delete logics
      // dispatch(deleteMaterials(idsToDelete));
      // dispatch(clearIds());
      // window.alert('Deletion Successful!');
      // handleSuccessRequest();
    } catch (error) {
      console.error('Error deleting vendors:', error);
    }
  };

  const confirmDelete = () => {
    handleDelete();
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
            text={"Are you sure you want to delete the selected vendors?"} 
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
