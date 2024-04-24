import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import propTypes from 'prop-types'

import UIcon from '../../../../../assets/icons/crud/edit_icon.svg'
import AIcon from '../../../../../assets/icons/crud/add_icon.svg'
import DIcon from '../../../../../assets/icons/crud/delete_icon.svg'


import DataItem from '../../../../../components/DataItem'
import Header from '../../../../../components/ModuleHeader'
//import MaterialForm from './MaterialForm'
import MaterialDetails from '../../Materials/MaterialDetails'
import SuppliedTable from './tables/SuppliedTable'
import { HeaderButton } from '../../../../../components/ModuleHeader'
import Dropdown from '../../../../../components/DropDown'

import { 
  removeVendorDetailsContent, 
  updateVendor,
  fetchVendorMaterials,
  fetchAllVendors
} from '../../../../../redux/vendor/VendorSlice';
import {
  fetchAllMaterials, fetchTypes
  , toggleHideShowDetails
  , removeMaterialDetailsContent,
  addMaterialSubmitContent
} from '../../../../../redux/material/MaterialSlice'
import { addMaterial } from '../../../../../redux/material/MaterialSlice'
import { 
  deleteMaterials, 
  clearIds
} from '../../../../../redux/material/selectedIdsSlice'
import { 
  setShowModal, 
  setModalContent, 
  setModalWidth } from '../../../../../redux/modalSlices';

import { useDispatch, useSelector } from 'react-redux'
import DeleteConfirmation from '../../../../../components/DeleteConfirmation/DeleteConfirmation'

const VendorDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const token = useSelector((state) => state.authentication.token);
  const [editable, setEditable] = useState(false);
  const [showAdding, setShowAdding] = useState(false);
  const addMaterialContent = useSelector(state => state.materials.materialSubmitContent);
  //const types = useSelector(state => state.materials.types);
  const showMaterialDetailsState = useSelector(state => state.materials.showDetails);
  const materialDetailsContent = useSelector(state => state.materials.materialDetailsContent);
  const thisVendorDetails = useSelector((state) => state.vendors.vendorDetailsContent);
  const thisVendorMaterials = useSelector((state) => state.vendors.selectedVendorMaterials);
  const selectedIds = useSelector((state) => state.selectedIds);
  const [updatedData, setUpdatedData] = useState({
    vendor_id: '',
    vendor_name: '',
    vendor_phone: '',
    vendor_email: '',
    vendor_tax_code: '',
    vendor_address: '',
    vendor_status: '',
  });

  const vendor_status = [
    {
        "type_id": "ACTIVE",
        "type_name": "ACTIVE"
    },
    {
        "type_id": "INACTIVE",
        "type_name": "INACTIVE"
    },
    {
        "type_id": "INORDER",
        "type_name": "INORDER"
    }
  ]

/*
  const toggleShowCreate = () => {
    dispatch(setModalContent(
      <MaterialForm 
        types={types} 
        onClick={toggleHideCreate} 
        onSuccess={handleSuccessRequest}
        vendorId={thisVendorDetails.vendor_id}
      />
    ));
    dispatch(setModalWidth('w-[60%]'));
    dispatch(setShowModal(true));
  };
*/

  const handleAdding = async () => {
    const result = await dispatch(addMaterial(addMaterialContent));
    console.log(result);
    alert('Save all changes successful!');
    dispatch(setShowModal(false));
    dispatch(setModalContent(''));
    dispatch(addMaterialSubmitContent(null));
    setShowAdding(false);
    fetchMaterials();
  }
  const handleNo = () => {
    dispatch(setShowModal(false));
    dispatch(setModalContent(''));
  } 
  const toggleShowAdding = async () => {
    if(editable && showAdding){
      if(addMaterialContent === null || addMaterialContent.material_name === '' || addMaterialContent.material_price === 0 || addMaterialContent.material_unit_of_measure === '' ){
        alert('Please give all information!');
        return;
      }else{
        dispatch(setModalWidth('w-[280px]'));
        dispatch(setModalContent(
          <DeleteConfirmation 
            text={"Save all changes?"}
            yes={handleAdding}
            no={handleNo}
          />
        ))
        dispatch(setShowModal(true));
      }
  }else{
    setShowAdding(!showAdding);
  }
  }

  const fetchMaterials = async () => {
    // dispatch(fetchVendorDetails(selectedVendorId))
    dispatch(fetchVendorMaterials(thisVendorDetails.vendor_id));
  }

  useEffect(() => {
    fetchMaterials();
    console.log(thisVendorDetails);
    setUpdatedData(thisVendorDetails);
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };
  

  const handleDropdownChange = (selectedValue) => {
    setUpdatedData({ ...updatedData, vendor_status: selectedValue });
  };

  const toggleEditSaveChangesVendor = () => {
    if(editable === true){
      if(JSON.stringify(thisVendorDetails) !== JSON.stringify(updatedData)){
      handleBackendUpdate();
      }
    }
    setEditable(!editable);
    setShowAdding(false);
  } 

  const handleBackendUpdate = async () => {
    try{
      await dispatch(updateVendor(updatedData));
      dispatch(fetchAllVendors());
      alert("Vendor updated successfully!")
      dispatch(removeVendorDetailsContent());
      navigate('/vendors');
    }catch(e){
      alert("Something went wrong while updating vendor " + e.message);
    }
  }

  const handleSuccessRequest = () => {
    dispatch(fetchVendorMaterials(thisVendorDetails.vendor_id));
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  }

  const toggleHideMaterialDetails = () => {
    dispatch(toggleHideShowDetails());
    dispatch(removeMaterialDetailsContent());
  };

  //delete materials

  const confirmDelete = () => {
    if(selectedIds.selected_ids.length === 0){
      alert('Please, choose one checkbox whose you want to delete.')
      return;
    }
    dispatch(setModalWidth('w-[280px]'));
    dispatch(setModalContent(
      <DeleteConfirmation
        text={"Are you sure to remove these materials?"}
        yes={() => handleDeleteMaterials()}
        no={cancelDelete}
      />
    ));
    dispatch(setShowModal(true));
  };

  const cancelDelete = () => {
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  };

  const handleDeleteMaterials = async () => {
    try {
      dispatch(deleteMaterials(selectedIds));
      dispatch(clearIds());
      window.alert('Deletion Successful!');
      handleSuccessRequest();
    } catch (error) {
      console.error('Error deleting materials:', error);
    }
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  }

  return (
    <div className='w-full h-full font-alata transition-all duration-150'>
      <Header title={
        <span>
          <Link className='hover:underline' to={'/vendors'}>{"Vendor List"}</Link> / <span className='font-light'>{thisVendorDetails.vendor_name}</span>
        </span>
      }>
        <HeaderButton title={editable ? "Save Changes" : "Edit"} icon={UIcon} css={"bg-secondary"} onClick={() => toggleEditSaveChangesVendor()}/>
      </Header>
      <div className={`transition-opacity duration-500 ${showMaterialDetailsState ? '' : 'opacity-0 pointer-events-none'}`}>
          {showMaterialDetailsState && (
            <MaterialDetails 
            data={materialDetailsContent} 
            exit={toggleHideMaterialDetails} 
            />
          )}
      </div>
      {/* form data */}
      <div className='flex place-content-between bg-hover2 bg-opacity-50 p-10 text-lg'>
        <div className='column flex-col space-y-2'>
          <DataItem 
          label="Vendor ID" 
          value={updatedData.vendor_id}
          type="text"
          editable={false}
          viewOnly={!editable}
          /> 
          <DataItem 
          label="Vendor Name" 
          id="vendor_name"
          name="vendor_name"
          value={updatedData.vendor_name}
          onChange={handleChange}
          type="text"
          editable={editable}
          viewOnly={!editable}
          /> 
          <DataItem 
          label="Phone" 
          name="vendor_phone"
          value={updatedData.vendor_phone}
          onChange={handleChange}
          type="text"
          editable={editable}
          viewOnly={!editable}
          /> 
        </div>

        <div className='column flex-col space-y-2'>
        <DataItem 
          label="Email" 
          name="vendor_email"
          value={updatedData.vendor_email}
          onChange={handleChange}
          type="text"
          editable={editable}
          viewOnly={!editable}
          /> 
        <DataItem 
          label="Tax Code"  
          name="vendor_tax_code"
          value={updatedData.vendor_tax_code}
          onChange={handleChange}
          type="text"
          editable={editable}
          viewOnly={!editable}
          /> 
        <DataItem 
          label="Address" 
          name="vendor_address"
          value={updatedData.vendor_address}
          onChange={handleChange}
          type="text"
          editable={editable}
          viewOnly={!editable}
          /> 
        </div>

        <div className='column flex-col space-y-2'>
          <div className='flex place-content-between transition-all duration-200 ease-in-out'>
              <label className='min-w-40'>Vendor Status:</label>
              <Dropdown 
              options={vendor_status} 
              selectedOption={updatedData.vendor_status}  
              onChange={handleDropdownChange} 
              editable={editable}
              />
          </div>
          <div>
            {/* spacer */}
            {/* {
              JSON.stringify(updatedData)
            } */}
          </div>
          <DataItem 
          label="Total order budget (VND)" 
          value={"0"}
          type="text"
          editable={false}
          viewOnly={!editable}
          /> 
        </div>
      </div>
      <div className='h-10 items-center place-content-center'>
        {/* {
          editable &&
          <SubmitButton title={"Save Changes"} func={handleBackendUpdate} />
        } */}
        </div>  
      <Header title="Supplied Products">
        {
          editable &&
          <HeaderButton icon={AIcon} title={showAdding ? 'Save Change' : 'Add'} onClick={toggleShowAdding} />
        }
        {
          editable &&
          <HeaderButton icon={DIcon} title='Delete' onClick={confirmDelete} />
        }
      </Header>
      
      {/* {
        JSON.stringify(thisVendorMaterials)
      } */}
      {
        // (thisVendorMaterials 
        //   ? 
        //   (
            // (thisVendorMaterials.length > 0) ?
            <SuppliedTable 
            initialData={thisVendorMaterials} 
            editable={editable} 
            vendorId={thisVendorDetails.vendor_id} 
            showAdding={showAdding}
            />
          //   : <div className='text-xl bg-secondary p-5 rounded-lg'>
          //       This vendor doesn&#39;t have any material ! start adding some by clicking &#39;Edit&#39; button.
          //     </div>
          // )
          // :
          // <div className='text-xl bg-secondary p-5 rounded-lg'>
          //       Loading this vendor materials data...
          // </div>
        //)
      }
    </div>
  )
}

export default VendorDetails;

VendorDetails.propTypes = {
  data: propTypes.array,
}

