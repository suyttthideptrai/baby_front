import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DataItem from '../../../../components/DataItem'
import SearchBar from '../../../../components/SearchBar'

import { useDispatch, useSelector } from 'react-redux'

import XIcon from '../../../../assets/icons/crud/x_icon.svg'
import { createExport } from '../../../../redux/material/MaterialSlice'


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
   const [exportData, setExportData] = useState([]);

   const handleExit = () => {
      exit();
   }

   const handleChange = (e) => {
      setExportData({
         ...exportData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createExport(exportData));
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
            <div>
               <DataItem 
                  label="Material ID" 
                  value={materialData.entity_id}
                  type="text"
                  viewOnly={true}
               />
               <div className='flex'>
                  <span>
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
            <div>
               <DataItem 
                  label="Unit of Measure" 
                  value={materialData.entity_unit_of_measure}
                  type="text"
                  viewOnly={true}
               />
               <DataItem 
                  label="Quantity" 
                  value={materialData.export_id}
                  type="text"
                  editable={true}
               />
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