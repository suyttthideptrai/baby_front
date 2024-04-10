import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMaterials, fetchTypes
  , toggleHideShowDetails
  , removeMaterialDetailsContent
  , toggleHideShowUpdate
  , toggleHideShowCreate 
} from '../../../../redux/material/MaterialSlice';
import { 
  deleteMaterials
  , clearIds
  , setSelectedMaterial } from '../../../../redux/material/selectedIdsSlice';
import React, { useEffect, useState } from 'react'
import DeleteConfirmation from '../../../../components/DeleteConfirmation/DeleteConfirmation';
import StatusMessage from '../../../../components/StatusMessage';
import Table from './Table/Table'
import MaterialForm from '../Vendors/modules/MaterialForm';
import MaterialDetails from './MaterialDetails';
import UpdateForm from './UpdateForm';
import Header from './Header';


const MaterialsPage
 = () => {
  const dispatch = useDispatch();
  const materials = useSelector(state => state.materials);
  const idsToDelete = useSelector(state => state.selectedIds)

  const [message, setMessage] = useState("");
  const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);
  const showCreateMaterialState = useSelector(state => state.materials.showCreateMaterialForm);
  const showDetailsState = useSelector(state => state.materials.showDetails);
  const showUpdateMaterialState = useSelector(state => state.materials.showUpdateForm);
  
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
    setDeleteConfirmation(true);
  }

  const confirmDelete = () => {
    handleDelete();
    setDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
  };
  
  const toggleShowCreate = () => {
    dispatch(toggleHideShowCreate());
  };

  const toggleHideMaterialDetails = () => {
    dispatch(toggleHideShowDetails());
    dispatch(removeMaterialDetailsContent());
  };

  const toggleShowUpdateForm = () => {
    console.log('Toggle show update');
    dispatch(toggleHideShowUpdate());
  };

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchAllMaterials());
      dispatch(fetchTypes());
    }
    fetchData();
  }, []);

  const handleSuccessRequest = () => {
    dispatch(fetchAllMaterials());
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
        <Header onDelete={handleDeleteConfirmation} onAdd={toggleShowCreate} onEdit={handleClickEdit}/>
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
      <div className={`transition-opacity duration-500 ${showDeleteConfirmation ? '' : 'opacity-0 pointer-events-none'}`}>
          {showDeleteConfirmation && (
            <DeleteConfirmation 
            text={"Are you sure you want to delete the selected materials?"} 
            yes={confirmDelete} 
            no={cancelDelete} />
          )}
      </div>
      <div className={`transition-opacity duration-500 ${showUpdateMaterialState ? '' : 'opacity-0 pointer-events-none'}`}>
          {showUpdateMaterialState && (
            <UpdateForm exit={toggleShowUpdateForm} />
          )}
      </div>
      <div className={`transition-opacity duration-500 ${showDetailsState ? '' : 'opacity-0 pointer-events-none'}`}>
          {showDetailsState && (
            <MaterialDetails 
            data={materials.materialDetailsContent} 
            exit={toggleHideMaterialDetails} 
            />
          )}
      </div>
      {
        showCreateMaterialState 
        ?
        <MaterialForm 
        types={materials.types} 
        onClick={toggleShowCreate} 
        onSuccess={handleSuccessRequest} />
        :
        <>
        </>
      }
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
