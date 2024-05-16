import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DataItem from '../../../../components/DataItem'
import SearchBar from '../../../../components/SearchBar'

import { useDispatch, useSelector } from 'react-redux'

import XIcon from '../../../../assets/icons/crud/x_icon.svg'
import exportIcon from '../../../../assets/icons/crud/export_icon.svg'
import { createExport } from '../../../../redux/material/MaterialSlice'
import { HeaderButton } from '../../../../components/ModuleHeader'


const CreateExport = ({exit}) => {
   const API_ENDPOINT = import.meta.env.VITE_APP_API_CRUD_URL + '/material/query/name/';
   const dispatch = useDispatch();
   const materialTypes = useSelector(state => state.materials.types);
   const getMaterialGroupName = (groupId) => {
      const materialGroup = materialTypes.find(group => group.type_id === groupId);
      return materialGroup ? materialGroup.type_name.trim() : 'Unknown';
   };
   const initialData = {
      entity_id: "",
      entity_name: "",
      entity_unit_of_measure: "",
      entity_quantity: 0,
      entity_price: 0,
      entity_type: 10,
      entity_vendor_id: "",
      entity_vendor_name: "",
   };
   const [materialData, setMaterialData] = useState(initialData);
   const [exportData, setExportData] = useState({
      material_quantities: {}
   });
   const [quantity, setQuantity] = useState(1);

   const handleExit = () => {
      exit();
   }

   const handleChange = (e) => {
      const val = e.target.value;
      const name = e.target.name;
      if(val.includes('-')){
         setQuantity(1);
         setExportData(prevExportData => ({
            ...prevExportData,
            material_quantities: {
               ...prevExportData.material_quantities,
               [name]: 1,
            }
         }));
         return;
      }
      if(val > materialData.entity_quantity){
         setQuantity(materialData.entity_quantity);
         setExportData(prevExportData => ({
            ...prevExportData,
            material_quantities: {
               ...prevExportData.material_quantities,
               [name]: materialData.entity_quantity,
            }
         }));
         return;
      }
      setQuantity(parseInt(val));
      setExportData(prevExportData => ({
         ...prevExportData,
         material_quantities: {
            ...prevExportData.material_quantities,
            [name]: val,
         }
      }));
   };

   const handleSubmit = async () => {
      if(materialData.entity_quantity < 0){
         alert('Illegal quantity!, Please choose another material! ');
         return;
      }
      if(isNaN(quantity) || quantity < 1){
         alert('Quantity must be at least 1');
         return;
      }
      if(materialData.entity_id === ""){
         alert('You must find a material first!');
      }else{
            const respond = await dispatch(createExport(exportData));
            console.log(respond);
            alert('Exported successfully!');
            exit();
      }
   };

   const onSelectSuggestion = (suggestion) => {
         setMaterialData(suggestion);
   }

  return (
      <div className='p-1 h-auto bg-primary font-inter'>
         <div className='flex h-8 text-white place-content-between'>
            <span>
               Material Export
            </span>
            <img className='h-6 cursor-pointer' onDoubleClick={handleExit} src={XIcon} alt="" />
         </div>
         <div className='bg-white flex place-content-around space-x-2 p-10'>
            {/* {JSON.stringify(exportData) + quantity} */}
            <div>
               <DataItem 
                  label="Material ID" 
                  value={materialData.entity_id}
                  type="text"
                  viewOnly={true}
               />
               <div className='flex items-center'>
                  <span className='font-bold'>
                     Material Name: 
                  </span>
                  <SearchBar 
                     selfSuggest={true}
                     endpoint={API_ENDPOINT}
                     placeHolder={"Search Material..."}
                     onSuggestionSelected={onSelectSuggestion}
                     onChangeQueryAfterSelect={() => {
                        setMaterialData(initialData)
                        setExportData([])
                     }}
                  />
               </div>
               <DataItem 
                  label="Material Group" 
                  value={getMaterialGroupName(materialData.entity_type)}
                  type="text"
                  editable={false}
                  viewOnly={true}
               /> 
               <DataItem 
                  label="Vendor" 
                  value={materialData.entity_vendor_name}
                  type="text"
                  viewOnly={true}
               />
            </div>
            <div className='flex-col place-content-between'>
               <DataItem 
                  label="Unit of Measure" 
                  value={materialData.entity_unit_of_measure}
                  type="text"
                  viewOnly={true}
               />
               <div className='flex place-content-start'>
                  <span className='font-bold'>
                     Quantity:
                  </span>
                  <span className='w-4'>
                  </span>
                  <input
                     label="Quantity" 
                     name={materialData.entity_id}
                     value={quantity}
                     type="number"
                     onChange={(e) => handleChange(e)}
                     className='w-6 rounded-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  />
                  <span>/ {materialData.entity_quantity}</span>
               </div>
               <div className='w-full p-2 flex place-content-between'>
               <div></div> <HeaderButton title='Export' onClick={handleSubmit} icon={exportIcon} />
               </div>
            </div>
         </div>
      </div>
  );
}

CreateExport.propTypes = {
   exit: PropTypes.func
}

export default CreateExport

const Row = ({ data, index, onChange, isRemovable, onRemove, onChangeQuantity }) => {
   // similar to Row in CreateOrder but for export purpose
   // replace the necessary parts with export related logic
   // ...
};

Row.propTypes = {
   data: PropTypes.object,
   index: PropTypes.number,
   onChange: PropTypes.func,
   isRemovable: PropTypes.bool,
   onRemove: PropTypes.func,
   onChangeQuantity: PropTypes.func
};