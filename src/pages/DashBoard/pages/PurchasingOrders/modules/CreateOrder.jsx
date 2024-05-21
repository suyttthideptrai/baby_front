import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header, { HeaderButton } from '../../../../../components/ModuleHeader'
import DataItem from '../../../../../components/DataItem'
import Dropdown from '../../../../../components/DropDown'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderDetails, fetchOrders } from '../../../../../redux/order/orderSlice'
import { createOrder } from '../../../../../redux/order/orderSlice'
import { ORDER_STATUS } from '../../../../../utils/constant'
import DetailsTable from './DetailsTable'
import { formatCurrency, formatMaterialQuantity } from '../../../../../utils/utils'
import SearchBar from '../../../../../components/SearchBar'
import NonSelfSuggestSearchBar from '../../../../../components/SearchBar/NonSelfSuggest'

import redXIcon from '../../../../../assets/icons/crud/x_icon_red.svg'
import addIcon from '../../../../../assets/icons/crud/add_icon.svg'
const CreateOrder = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const initialState = {
      order_title: '',
      order_creator_id: 1,
      order_delivery_date: '',
      order_vendor_id: '',
      order_materials_quantities: {}
    };
   const [newOrderData, setNewOrderData] = useState(initialState);
   const [orderTotalAmount, setOrderTotalAmount] = useState(0);
   const [selectedVendor, setSelectedVendor] = useState(null);
   //fetched materials
   const [selectedVendorMaterials, setSelectedVendorMaterials] = useState([]);

   //selected ones
   const [selectedMaterialsForCreateOrder, setSelectedMaterialsForCreateOrder] = useState([]);

   const vendorEndpoint = import.meta.env.VITE_APP_API_CRUD_URL + '/vendor/query/suggest/name/';
   const materialEndpoint = `${import.meta.env.VITE_APP_API_CRUD_URL}/vendor/query/${selectedVendor ? selectedVendor.entity_id : 'null'}/`;

   const fetchMaterialsData = async (vendor_id) => {
      const response = await fetch(import.meta.env.VITE_APP_API_CRUD_URL + '/vendor/material/' + vendor_id);
      const data = await response.json();
      setSelectedVendorMaterials(data);
   }

   useEffect(() => {
      if (selectedVendor !== null) {
         fetchMaterialsData(selectedVendor.entity_id);
         setNewOrderData({
            ...newOrderData,
            order_vendor_id: selectedVendor.entity_id
          });
      }
   }, [selectedVendor])

   useEffect(() => {
      const calculateEstimatedTotal = () => {
         let total = 0;
       
         selectedMaterialsForCreateOrder.forEach(material => {
            console.log(total);
           const quantity = newOrderData.order_materials_quantities[material.entity_id] || 0;
           const totalPrice = parseInt(quantity) * material.entity_price;
           total += totalPrice
         });
         return total;
      };
      setOrderTotalAmount(calculateEstimatedTotal());
   }, [newOrderData.order_materials_quantities])


   const handleNewOrderDataChange = (e) => {
      setNewOrderData({
         ...newOrderData,
         [e.target.name]: e.target.value
      })
   }

   const handleVendorSuggestionSelected = (vendor) => {
      setSelectedVendor(vendor);
   }

   const transferSuggestsOutData = (data) => {
      // console.log(data);
      setSelectedVendorMaterials(data);
   }

   const handleChooseMaterialCheckbox = (e) => {
      if(e.target.checked === true){
         const material = selectedVendorMaterials.find(material => material.entity_id === e.target.value);
         setSelectedMaterialsForCreateOrder([...selectedMaterialsForCreateOrder, material]);
         setNewOrderData({
            ...newOrderData,
            order_materials_quantities: {
              ...newOrderData.order_materials_quantities,
              [material.entity_id]: 1
            }
          });
      }else{
         // const material = selectedMaterialsForCreateOrder.find(material => material.entity_id === e.target.value);
         // const {[e.target.value.toString()]: _, ...rest} = newOrderData.order_materials_quantities;
         //    setNewOrderData({
         //    ...newOrderData,
         //    order_materials_quantities: rest
         // });
         handleRemoveMaterialPool(e.target.value);
      }
   }

   const handleRemoveMaterialPool = (material_id) => {
      setSelectedMaterialsForCreateOrder(selectedMaterialsForCreateOrder.filter(material => material.entity_id !== material_id));
      const {[material_id]: _, ...rest} = newOrderData.order_materials_quantities;
      setNewOrderData({
      ...newOrderData,
      order_materials_quantities: rest
      });
   }

   const handleChangeMaterialQuantity = (material_id, quantity) => {
      setNewOrderData({
         ...newOrderData,
         order_materials_quantities: {
            ...newOrderData.order_materials_quantities,
            [material_id]: quantity
         }
      });
   }

   const handleCreateNewOrder = async () => {
      if(selectedMaterialsForCreateOrder.length === 0 || selectedVendor.entity_id === ''){
         alert('Give all imformation please!')
      }else{
         await dispatch(createOrder(newOrderData));
         setNewOrderData(initialState);
         await dispatch(fetchOrders());
         alert('Create new purchase order successfully!')
         navigate('/orders');
      }
   }

   return (
      <div className='w-full h-full font-alata transition-all duration-150'>
         <Header title={
            <span>
               <Link className='hover:underline' to={'/orders'}>{"Purchase Orders "}</Link> /
               <span className='font-light'> Create New Order</span>
            </span>
         } >
            <HeaderButton icon={addIcon} title="Create" onClick={() => handleCreateNewOrder()} />
         </Header>
         {/* {JSON.stringify(newOrderData)} */}
         <div className='flex place-content-between bg-hover2 bg-opacity-50 p-10 text-lg'>
            <div className='column flex-col space-y-2 w-[35%]'>
               <DataItem
                  label="Order Title"
                  name={"order_title"}
                  type="text"
                  editable={true}
                  onChange={(e) => handleNewOrderDataChange(e)}
                  hasBorder={true}
               />
               <DataItem
                  label="Vendor ID"
                  name="vendor_id"
                  type="text"
                  value={selectedVendor ? selectedVendor.entity_id : ''}
                  editable={false}
                  viewOnly={true}
               />
               <div className='flex place-content-between border-1 border-black'>
                  <label className='font-bold'>
                     Vendor Name:
                  </label>
                  <SearchBar
                     endpoint={vendorEndpoint}
                     selfSuggest={true}
                     onSuggestionSelected={(suggestion) => handleVendorSuggestionSelected(suggestion)}
                     onChangeQueryAfterSelect={() => {
                        setSelectedVendorMaterials([])
                        setSelectedVendor(null)
                     }}
                     placeHolder="Search Vendor..."
                  />
               </div>

            </div>

            <div className='column flex-col space-y-2 w-[35%]'>

               <DataItem
                  label="Order Date"
                  name="order_issued_date"
                  type="text"
                  value={new Date().toLocaleDateString()}
                  editable={false}
                  viewOnly={true}
               />
               {/* <DataItem
                  label="Due Date"
                  name="order_delivery_date"
                  type="date"
                  onChange={(e) => handleNewOrderDataChange(e)}
                  editable={true}
               /> */}
               <div className='flex w-auto place-content-between'>
                  <label 
                     htmlFor=""
                     className='w-[40%]'
                  >Due Date: 
                  </label>
                  
                  <input 
                     type="date" 
                     name="order_delivery_date"
                     className='bg-inherit border-2 rounded-md'
                     onChange={(e) => handleNewOrderDataChange(e)}
                  />
                  <div className=''>

</div>
               </div>
               <DataItem
                  label="Total Amount"
                  name="order_total_amount"
                  value={formatCurrency(orderTotalAmount)}
                  //onChange={handleChange}
                  type="text"
                  editable={false}
                  viewOnly={true}

               />
            </div>
         </div>
         <div>
            <div className='w-[30%] pl-5 pt-3'>
               {
                  (selectedVendor !== null) && 
                  (
                     <NonSelfSuggestSearchBar 
                        endpoint={materialEndpoint} 
                        suggestionDataOut={(data) => transferSuggestsOutData(data)}
                        placeHolder='Search Material...'
                     />
                  )
               }
            </div>
            <div className='w-full h-[50%] p-5 overflow-y-scroll'>
               <table className='table-auto w-full h-fit'>
                  <thead className='tracking-wider'>
                  <tr>
                     <td className='w-10 p-3'></td>
                     <th className='w-[10%] text-left'>No.</th>
                     <th className=''>Material Name</th>
                     <th className='w-[15%]'>Unit of Measure</th>
                     <th className='w-[15%]'>Quantity</th>
                     <th className='w-[20%]'>Unit Price (VND)</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                     selectedMaterialsForCreateOrder.length > 0 && selectedMaterialsForCreateOrder.map((data, index) => (
                        <Row 
                        key={data.entity_id} 
                        data={data} 
                        index={index + 1} 
                        onRemove={handleRemoveMaterialPool}
                        isRemovable={true}
                        onChangeQuantity={(id, quantity) => handleChangeMaterialQuantity(id, quantity)}
                        />
                     ))
                  }
                  {
                     selectedMaterialsForCreateOrder.length > 0 && (
                        <hr />
                     )
                  }
                  {selectedVendorMaterials?.length > 0 ? selectedVendorMaterials.map((data, index) => (
                     <Row 
                        key={data.entity_id} 
                        data={data} 
                        index={index + 1} 
                        onChange={handleChooseMaterialCheckbox}
                        isRemovable={false}
                     />
                  ))
                     :
                     'nothing found!'}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}


CreateOrder.propTypes = {
   isCreate: PropTypes.bool
}

export default CreateOrder

const Row = ({ data, index, onChange, isRemovable, onRemove, onChangeQuantity }) => {
   const [quantity, setQuantity] = useState(1);
   const handleChooseMaterial = (e) => {
      onChange(e);
   }
   const handleRemove = (id) => {
      onRemove(id);
   }
   const handleChangeQuantity = (e) => {
      let value = e.target.value;
      if (value.includes('-')) {
         alert('Quantity cannot be negative!');
         return;
      }
      if(value < 1){
         alert('Quantity must be greater than 0!');
         return;
      }
      setQuantity(e.target.value);
      onChangeQuantity(e.target.name, e.target.value);
   }
   return (
      <tr className='tracking-wide text-gray-600 hover:text-black hover:cursor-pointer border-y-2'>
         <td className='pl-3'>{
            isRemovable ? 
            <img className='w-5 h-5' src={redXIcon} onClick={() => handleRemove(data.entity_id)} /> : 
            <input className='w-5 h-5' type="checkbox" value={data.entity_id} onChange={(e) => handleChooseMaterial(e)} />
         }</td>
         <td>{index}</td>
         <td className="text-center">{data.entity_name}</td>
         <td className="text-center">{data.entity_unit_of_measure}</td>
         <td className="text-center">
            {
               isRemovable ?
               <input 
                  name={data.entity_id}
                  type="number" 
                  className='text-center w-1/2'
                  value={quantity}
                  min={1}
                  onChange={(e) => handleChangeQuantity(e)}
                  placeholder='1'
               />
               :
               formatMaterialQuantity(data.entity_quantity)
            }
         </td>
         <td className="text-center p-3">{formatCurrency(data.entity_price)}</td>
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