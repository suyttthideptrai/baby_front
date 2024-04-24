import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMaterials, fetchTypes
  , toggleHideShowUpdate
} from '../../../../redux/material/MaterialSlice';
import { 
  deleteMaterials
  , clearIds
  , setSelectedMaterial } from '../../../../redux/material/selectedIdsSlice';
import { 
  setShowModal,
  setModalContent,
  setModalHeight,
  setModalWidth
 } from '../../../../redux/modalSlices';
import React, { useEffect, useState } from 'react'
import DeleteConfirmation from '../../../../components/DeleteConfirmation/DeleteConfirmation';
import StatusMessage from '../../../../components/StatusMessage';
import Table from './Table/Table'
import UpdateForm from './UpdateForm';
//import Header from './Header';
import Header, { HeaderButton } from '../../../../components/ModuleHeader';


import deleteIcon from '../../../../assets/icons/crud/delete_icon.svg'
import editIcon from '../../../../assets/icons/crud/edit_icon.svg'
import addIcon from '../../../../assets/icons/crud/add_icon.svg'
import exportIcon from '../../../../assets/icons/crud/export_icon.svg'


const MaterialsPage
 = () => {
  const dispatch = useDispatch();
  const materials = useSelector(state => state.materials);
  const idsToDelete = useSelector(state => state.selectedIds)

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchAllMaterials());
      dispatch(fetchTypes());
    }
    fetchData();
  }, []);
  
  //DELETE SECTION
  const handleDelete = () => {
    try {
      dispatch(deleteMaterials(idsToDelete));
      dispatch(clearIds());
      window.alert('Deletion Successful!');
      handleSuccessRequest();
    } catch (error) {
      console.error('Error deleting materials:', error);
    }
  };

  const handleDeleteConfirmation = () => {
    if(idsToDelete.selected_ids.length === 0) {
      alert("Please select a material to delete");
      return;
    }
    dispatch(setModalWidth('w-[280px]'));
    dispatch(setModalContent(
      <DeleteConfirmation 
      text={"Are you sure you want to delete the selected materials?"} 
      yes={confirmDelete} 
      no={cancelDelete} 
      />
    ))
    dispatch(setShowModal(true));
  }

  const confirmDelete = () => {
    handleDelete();
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  };

  const cancelDelete = () => {
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  };


  //MATERIAL UPDATE SECTION
  const toggleShowUpdateForm = () => {
    dispatch(setModalWidth('w-[72%]'));
    dispatch(setModalContent(
      <UpdateForm exit={toggleHideUpdateForm} />
    ));
    dispatch(setShowModal(true));
  };

  const toggleHideUpdateForm = () => {
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  }


  const handleSuccessRequest = () => {
    dispatch(fetchAllMaterials());
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  }

  const handleClickEdit = () => {
    if(idsToDelete.selected_ids.length == 0){
      alert('Please choose one checkbox whose material you want to modify');
      return;
    }
    if(idsToDelete.selected_ids.length > 1){
      alert('You can modify only one material at the same time');
      return;
    }
    const id = idsToDelete.selected_ids[0];
    const data = materials.materials.find(item => item.material_id === id);
    dispatch(setSelectedMaterial(data));
    toggleShowUpdateForm();
  }

  return (
    <div className='flex flex-col h-full font-alata'>
      <div>
        {/* <Header onDelete={handleDeleteConfirmation} onEdit={handleClickEdit}/> */}
        <Header title={"Material List"}>
          <HeaderButton icon={exportIcon} title={"Export"} css={"bg-secondary hover:bg-hover2"} />
          <HeaderButton icon={deleteIcon} title={"Delete"} onClick={handleDeleteConfirmation} css={"bg-secondary hover:bg-[#EAECF0]"}/>
          <HeaderButton icon={editIcon} title={"Edit"} onClick={handleClickEdit} css={"bg-secondary hover:bg-[#EAECF0]"}/>
        </Header>
      </div>
      {
        // JSON.stringify(idsToDelete) +
        // " add form " + JSON.stringify(showCreateMaterialState) +
        // " details " + JSON.stringify(showDetailsState) +
        // " update form " + JSON.stringify(showUpdateMaterialState)
      }
      {/* {
        showUpdateMaterialState
        ?
        <UpdateForm exit={toggleShowUpdateForm} />
        :
        <></>
      } */}
      {/* {
        showDeleteConfirmation
        ?
        <DeleteConfirmation yes={confirmDelete} no={cancelDelete} />
        :
        <></>
      } */}
      {
        materials
        ?
        <div className='mt-2 w-full'>
          <Table initialData={materials.materials} />
        </div>
        : 
        <StatusMessage message={message}/>
      }
    </div>
  )
}


export default MaterialsPage;
