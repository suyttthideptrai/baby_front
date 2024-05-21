import React, { useState, useEffect } from 'react';
import XIcon from '../../../../assets/icons/crud/x_icon.svg';
import DataItem from '../../../../components/DataItem';
import PropTypes from 'prop-types';
import Dropdown from '../../../../components/DropDown';
import { useSelector, useDispatch } from 'react-redux';
import { updateMaterial, fetchAllMaterials } from '../../../../redux/material/MaterialSlice';
import { removeSelectedMaterial } from '../../../../redux/material/selectedIdsSlice';
import { formatMaterialQuantity } from '../../../../utils/utils';
import { setShowModal, setModalContent } from '../../../../redux/modalSlices';
import { HeaderButton } from '../../../../components/ModuleHeader';
import SaveIcon from '../../../../assets/icons/crud/save_icon.svg'

const UpdateForm = ({ exit }) => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.materials.types);
    // const [query, setQuery] = useState('');
    // const [suggestions, setSuggestions] = useState([]);
    // const [isMaterialSelected, setIsMaterialSelected] = useState(false);
    const data = useSelector(state => state.selectedIds.selectedMaterial);
    const token = useSelector(state => state.authentication.token);
    const [selectedMaterial, setSelectedMaterial] = useState({
        material_id: '',
        material_name: '',
        material_type: '',
        material_unit_of_measure: '',
        material_quantity: '',
        material_price: '',
        material_warehouse_date: '',
    });

    let warehouseDate = null;
    let formattedWarehouseDate = '';

    if (selectedMaterial.material_warehouse_date && !isNaN(Date.parse(selectedMaterial.material_warehouse_date))) {
        warehouseDate = new Date(selectedMaterial.material_warehouse_date);
        formattedWarehouseDate = warehouseDate.toISOString().split('T')[0];
    }

    useEffect(() => {
        setSelectedMaterial(data);
    }, []);

    // useEffect(() => {
    //     if (query.trim() === '') {
    //         setSuggestions([]);
    //         return;
    //     }

    //     fetchSuggestions(query);
    // }, [query]);

    // const fetchSuggestions = async (query) => {
    //     try {
    //         const response = await fetch(`http://localhost:9999/api/crud/material/query/suggest/id/${query}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch suggestions');
    //         }
    //         const data = await response.json();
    //         setSuggestions(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handelChangeQuery = (event) => {
    //     setQuery(event.target.value);
    //     setIsMaterialSelected(false);
    // };

    // const handleSelectObject = (selected) => {
    //     setSelectedMaterial(selected);
    //     setQuery(selected.material_id);
    //     setIsMaterialSelected(true);
    // };

    const handleDropdownChange = (selectedValue) => {
        setSelectedMaterial(prevState => ({
            ...prevState,
            material_type: selectedValue
        }));
      };

    const handleChangeQueryValue = (event) => {
        const { name, value } = event.target;
        setSelectedMaterial(prevState => ({
            ...prevState,
            [name]: value
        }));
        //setIsMaterialSelected(false);
    };

    const handleUpdateButton = async (e) => {
        if(token === null) {
            alert("Error updating material. Please re-login and try again.");
            return;
        }
        const actionResult = await dispatch(updateMaterial(selectedMaterial));
        const isRejected = updateMaterial.rejected.match(actionResult);
        const isFulfilled = updateMaterial.fulfilled.match(actionResult);

        console.log(actionResult);

        if (isFulfilled) {
            alert("Successfully updated!");
            success();
        } else if (isRejected) {
            // Check the status code and display an appropriate alert
            if (actionResult.payload.status === 401) {
              alert("Unauthorized. Please re-login and try again.");
            } else if (actionResult.payload.status === 404) {
              alert("Material not found.");
            } else {
              alert("Update Failed!");
            }
        }
    };

    const success = () => {
        dispatch(fetchAllMaterials());
        dispatch(setShowModal(false));
        dispatch(setModalContent(null));
    }

    const handleExit = () => {
        dispatch(removeSelectedMaterial()); 
        exit();
    };

    return (
        <div className='bg-primary p-1 font-alata'>
            <div className=' flex place-content-between'>
                <span className='text-white'>Edit a material</span>
                <img className='h-8 cursor-pointer' onClick={handleExit} src={XIcon} alt="" />
            </div>
            <div className='w-full bg-white h-auto p-3 space-y-4'>
                {/* {
                    JSON.stringify(selectedMaterial)
                } */}
                <div className='flex place-content-around'>
                    <div className='column1 space-y-3'>
                        <DataItem
                            label="Material ID "
                            value={selectedMaterial.material_id}
                            name="material_id"
                            onChange={handleChangeQueryValue}
                            type="text"
                            editable={false}
                        />
                        {/* <div>
                            <label htmlFor="MaterialId">Material ID:</label>
                            <input
                            type="text"
                            value={query}
                            onChange={handelChangeQuery}
                            placeholder="Search..."
                            />
                            {suggestions.length > 0 && !isMaterialSelected && (
                                <ul>
                                {suggestions.map((suggestion) => (
                                    <SuggestionItem
                                    key={suggestion.material_id}
                                    suggestion={suggestion}
                                    onSelect={handleSelectObject}
                                    />
                                ))}
                                </ul>
                            )}
                        </div> */}
                        <DataItem
                            label="Material Name "
                            value={selectedMaterial.material_name}
                            name="material_name"
                            onChange={handleChangeQueryValue}
                            type="text"
                            editable={true}
                        />
                        <div className='flex place-content-between'>
                            <label className=''>Material Group : </label>
                            <Dropdown 
                            options={types} 
                            selectedOption={selectedMaterial.material_type} 
                            onChange={handleDropdownChange} 
                            editable={true}
                            />
                            <div className='w-2'></div>
                        </div>
                        <DataItem
                            label="Vendor "
                            value={selectedMaterial.material_vendor_name}
                            name="material_vendor"
                            onChange={handleChangeQueryValue}
                            type="text"
                            editable={false}
                        />
                    </div>

                    <div className='column2 space-y-3'>
                        <DataItem
                            label="Unit Of Measure "
                            value={selectedMaterial.material_unit_of_measure}
                            type="text"
                            name="material_unit_of_measure"
                            onChange={handleChangeQueryValue}
                            editable={true}
                        />
                        <DataItem
                            label="Quantity "
                            value={formatMaterialQuantity(selectedMaterial.material_quantity)}
                            name="material_quantity"
                            onChange={handleChangeQueryValue}
                            type="text"
                            editable={false}
                        />
                        <DataItem
                            label="Price (VND) "
                            value={selectedMaterial.material_price}
                            name="material_price"
                            onChange={handleChangeQueryValue}
                            type="number"
                            editable={false}
                        />
                        <DataItem
                            label="Warehouse Date "
                            value={formattedWarehouseDate}
                            type="date"
                            name="material_warehouse_date"
                            onChange={handleChangeQueryValue}
                            editable={true}
                        />
                    </div>
                </div>
                <div className='flex justify-end px-10'>
                    {/* <button className='
                    p-3 
                    rounded-xl 
                    bg-secondary
                    hover:bg-hover2
                    hover:rounded-md 
                    cursor-pointer 
                    duration-200 
                    mr-20
                    ' onDoubleClick={handleUpdateButton}
                    >
                        Save Changes
                    </button> */}
                    <HeaderButton title='Save' icon={SaveIcon} onClick={handleUpdateButton} />
                </div>
            </div>
        </div>
    )
}

const SuggestionItem = ({ suggestion, onSelect }) => {
    const handleClick = () => {
      onSelect(suggestion);
    };
  
    return (
      <li onClick={handleClick} className='cursor-pointer bg-grey-200 border-2 rounded-md'>
        {suggestion.material_id} - {suggestion.material_name}
      </li>
    );
  };

UpdateForm.propTypes = {
    exit: PropTypes.func
}

SuggestionItem.propTypes = {
  suggestion: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default UpdateForm;
