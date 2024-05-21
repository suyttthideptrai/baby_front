import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DataItem from '../../../../components/DataItem'

import { useDispatch, useSelector } from 'react-redux'
import { convertISOToDate, formatCurrency, formatMaterialQuantity } from '../../../../utils/utils'
import xIcon from '../../../../assets/icons/crud/x_icon.svg'
import exportIcon from '../../../../assets/icons/crud/export_button_icon.svg'
import { createExport } from '../../../../redux/material/MaterialSlice'
import { HeaderButton } from '../../../../components/ModuleHeader'
import minusIcon from '../../../../assets/icons/crud/minus_icon.svg'
import plusIcon from '../../../../assets/icons/crud/plus_icon.svg'


const CreateExport = ({ exit, initialData }) => {
   // const materialIds = useSelector(state => state.selectedIds.selected_ids);
   
   const dispatch = useDispatch();
   const [materialQuantities, setMaterialQuantities] = useState(initialData.reduce((acc, material) => {
      acc[material.material_id] = 0;
      return acc;
    }, {}));

    const [totalQuantity, setTotalQuantity] = useState(0);
   
    const onChangeQuantity = (material_id, newQuantity) => {
      setMaterialQuantities(prevState => ({
        ...prevState,
        [material_id]: newQuantity
      }));
    };

    useEffect(() => {
      setTotalQuantity(Object.values(materialQuantities).reduce((acc, quantity) => acc + quantity, 0));
   }, [materialQuantities]);


   const handleExport = async () => {
      if(totalQuantity === 0){
         alert('At least 1 item must be exported!');
         return;
      }
      await dispatch(createExport({
         material_quantities: materialQuantities
      }));
      alert('Exported successfully!');
      handleExit();
   }
   

   const handleExit = () => {
      exit();
   }

   // const handleInputChange = (e, material_id) => {
   //    const newQuantity = parseInt(e.target.value, 10);
   //    onChangeQuantity(material_id, newQuantity);
   //  };

   // const handleChange = (e) => {
   //    const val = e.target.value;
   //    const name = e.target.name;
   //    if(val.includes('-')){
   //       setQuantity(1);
   //       setExportData(prevExportData => ({
   //          ...prevExportData,
   //          material_quantities: {
   //             ...prevExportData.material_quantities,
   //             [name]: 1,
   //          }
   //       }));
   //       return;
   //    }
   //    if(val > materialData.entity_quantity){
   //       setQuantity(materialData.entity_quantity);
   //       setExportData(prevExportData => ({
   //          ...prevExportData,
   //          material_quantities: {
   //             ...prevExportData.material_quantities,
   //             [name]: materialData.entity_quantity,
   //          }
   //       }));
   //       return;
   //    }
   //    setQuantity(parseInt(val));
   //    setExportData(prevExportData => ({
   //       ...prevExportData,
   //       material_quantities: {
   //          ...prevExportData.material_quantities,
   //          [name]: val,
   //       }
   //    }));
   // };

   // const handleSubmit = async () => {
   //    if(materialData.entity_quantity < 0){
   //       alert('Illegal quantity!, Please choose another material! ');
   //       return;
   //    }
   //    if(isNaN(quantity) || quantity < 1){
   //       alert('Quantity must be at least 1');
   //       return;
   //    }
   //    if(materialData.entity_id === ""){
   //       alert('You must find a material first!');
   //    }else{
   //          const respond = await dispatch(createExport(exportData));
   //          console.log(respond);
   //          alert('Exported successfully!');
   //          exit();
   //    }
   // };

  return (
   <div className='bg-secondary rounded-none'>
   <div className='flex place-content-between mx-5 p-5 pt-10'>
      <div className='font-inter'>
         <span className='font-bold text-3xl'>Good Receipts: </span> <span className='font-light text-3xl'>{initialData.order_title}</span>
      </div>
      <img 
         className='w-6 h-6 cursor-pointer hover:scale-150 transition-all duration-200 ease-in-out'
      src={xIcon} alt="leave" onDoubleClick={handleExit} />
   </div>
   {
       JSON.stringify(materialQuantities)
   }
   {
         materialQuantities ?
         <div className='flex place-content-between p-5 text-lg border-b-2 border-black mx-5 font-alata'>
           <div className='column flex-col space-y-2'>
             <DataItem 
             label="Export Date" 
             value={convertISOToDate(new Date())}  
             type="text"
             viewOnly={true}
             /> 
             </div>
         </div> 
         :
         <div>
           Loading Order Data ...
         </div>
       }

      <div className='w-full h-[50%] px-5 pt-5 mx-5 overflow-y-scroll'>
         <table className='table-auto w-full h-fit mt-5 border-b-2 border-black '>
            <thead className='tracking-wider'>
            <tr>
               <th className='w-[5%] text-left'>No.</th>
               <th className=''>Material Name</th>
               <th className=''>Material ID</th>
               <th className='w-[10%] text-center items-center'>Quantity</th>
               <th className='w-[15%]'>Unit of Measure</th>
               <th className='w-[20%]'>Group Material</th>
               <th className=''>Vendor</th>
               {/* <th>Status</th> */}
            </tr>
            </thead>
            <tbody>
               {Array.isArray(initialData) ? (
               initialData.map((data, index) => (
                  <Row
                     key={data.material_id}
                     data={data}
                     index={index + 1}
                     onChangeQuantity={onChangeQuantity}
                  />
               ))
               ) : (
               <div>No data available</div>
               )}
            </tbody>
         </table>
      </div>
      <div className='flex place-content-between '>
            <div>

            </div>
            <div className='p-5'>
               <HeaderButton title='export' icon={exportIcon} onClick={handleExport} />
            </div>
      </div>
 </div>
  );
}

CreateExport.propTypes = {
   exit: PropTypes.func,
   initialData: PropTypes.array
}

export default CreateExport

const Row = ({ data, index, onChangeQuantity }) => {
   const materialTypes = useSelector(state => state.materials.types);
   const getMaterialGroupName = (groupId) => {
      const materialGroup = materialTypes.find(group => group.type_id === groupId);
      return materialGroup ? materialGroup.type_name.trim() : 'Unknown';
    };
   const id = data.material_id;
   const quantityCapacity = data.material_quantity;
   const [quantity, setQuantity] = useState(0);
   const handleChangeQuantity = (e) => {
      let value = e.target.value;
      if (value.includes('-')) {
         alert('Quantity cannot be negative!');
         return;
      }
      // if(value < 1){
      //    alert('Quantity must be greater than 0!');
      //    return;
      // }
      if(value > quantityCapacity){
         alert('Quantity must not exceed the remaining number!');
         return;
      }
      
      setQuantity(parseInt(e.target.value));
      onChangeQuantity(id, parseInt(e.target.value || 0));
   }

   const increment = () => {
      const q = parseInt(quantity)
      if(q === quantityCapacity){
         alert('Quantity must not exceed the remaining number!');
         return;
      }
      onChangeQuantity(id, q + 1);
      setQuantity(q + 1);
   }

   const decrement = () => {
      const q = parseInt(quantity)
      if (q === 0) {
         alert('Quantity must be greater than 0!');
         return;
      }
      onChangeQuantity(id, q - 1);
      setQuantity(q - 1);
   }

   return (
      <tr className='tracking-wide text-gray-600 hover:text-black hover:cursor-default items-center'>
         <td>{index}</td>
         <td className="text-center">{data.material_name}</td>
         <td className='text-center'>{id}</td>
         <td className="flex place-content-between items-center font-bold h-full select-none">
            <img onClick={decrement} src={minusIcon} alt="minus" className='w-3 h-3 cursor-pointer hover:bg-hover1 duration-200 rounded-sm' />
               <input 
                  type="number" 
                  value={quantity}
                  min={0}
                  disabled={quantityCapacity === 0}
                  max={quantityCapacity}
                  onChange={(e) => handleChangeQuantity(e)}
                  placeholder='1'
                  className='w-6 bg-hover2 rounded-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  width={5}
                  
               /> 
               <span className='w-1'>/</span> 
               <span>{formatMaterialQuantity(quantityCapacity)}</span>
            <img onClick={increment} src={plusIcon} alt="plus" className='w-4 h-4 cursor-pointer hover:bg-hover1 duration-200 rounded-sm' />
         </td>
         <td className="text-center">{data.material_unit_of_measure}</td>     
         <td className="text-center p-3">{getMaterialGroupName(data.material_type)}</td>
         <td className='text-center'>{data.material_vendor_name}</td>
      </tr>
   );
};

Row.propTypes = {
   data: PropTypes.object,
   index: PropTypes.number,
   onChange: PropTypes.func,
   isRemovable: PropTypes.bool,
   onRemove: PropTypes.func,
   onChangeQuantity: PropTypes.func
};