import React, { useState } from 'react';
import FormInput from '../../../../../components/FormInput';
import Dropdown from '../../../../../components/DropDown';
import axios from 'axios';
import PropTypes from 'prop-types';
import xIcon from '../../../../../assets/icons/crud/x_icon.svg';

const MaterialForm = ({ vendorId, types, onSuccess, onClick }) => {
  const [materialData, setMaterialData] = useState({
    material_name: '',
    material_price: 0,
    material_unit_of_measure: '',
    material_warehouse_date: '',
    material_type_id: 1,
    material_vendor_id: vendorId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterialData({ ...materialData, [name]: value });
  };
  const handleClick = () => {
    onClick();
    console.log('onClick');
  };

  const handleDropdownChange = (selectedValue) => {
    setMaterialData({ ...materialData, material_type_id: selectedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9999/api/crud/material/add', materialData);
      alert('Material successfully added to the system.');
      onSuccess();

      setMaterialData({
        material_name: '',
        material_price: 0,
        material_unit_of_measure: '',
        material_warehouse_date: '',
        material_type_id: 1,
        material_vendor_id: vendorId
      });
    } catch (error) {
      console.error('Error adding material:', error);
      alert('Error adding material. Please try again.');
    }
  };

  return (
    <div className='bg-primary w-[72%] border-1 fixed ml-10'>
      <div className='flex place-content-between'>
        <h2 className='font-bold text-lg p-1 text-center text-white'>Create New Material</h2>
        <img className='w-6 mr-5 cursor-pointer' onClick={handleClick} src={xIcon} alt="" />
      </div>
      <form className='bg-white border-2 border-grey-400 p-5' onSubmit={handleSubmit}>
        <div className='flex '>
            <div className=' w-1/2'>
                {/* Material Name */}
                <FormInput
                id="material_name"
                label="Material Name"
                name="material_name"
                value={materialData.material_name}
                onChange={handleChange}
                required
                />
                <FormInput
                id="material_price"
                label="Price"
                name="material_price"
                value={materialData.material_price}
                type={"number"}
                onChange={handleChange}
                required
                />
                {/* Unit of Measure */}
                <FormInput
                id="material_unit_of_measure"
                label="Unit of Measure"
                name="material_unit_of_measure"
                value={materialData.material_unit_of_measure}
                onChange={handleChange}
                required
                />
            </div>

            <div className=' w-1/2'>
                {/* Warehouse Date */}
                <FormInput
                id="material_warehouse_date"
                label="Warehouse Date"
                name="material_warehouse_date"
                value={materialData.material_warehouse_date}
                onChange={handleChange}
                required
                type="date"
                />
                {/* Material Type Dropdown */}
                <div className='flex mt-2 ml-5 place-content-between'>
                    <label className='font-bold min-w-40'>Material Type (*)</label>
                    <Dropdown options={types} selectedOption={materialData.material_type_id} onChange={handleDropdownChange} editable={true} />
                </div>
                <SubmitButton title={"Add Material"} />
            </div>
        </div>
      </form>
    </div>
  );
};

export const SubmitButton = ({title, func}) => {
    const handleSubmit = () => {
        func();
    }
    return (
        <div className='pt-5 flex place-content-end'>
            <button onClick={handleSubmit} className='
            w-auto
            p-2 
            rounded-lg 
            bg-primary
            text-white 
            font-bold
            hover:bg-hover1
            hover:text-primary 
            duration-200
            ' type="submit">{title}</button>
        </div>
    )
}


export default MaterialForm;

MaterialForm.propTypes = {
    vendorId: PropTypes.string,
    types: PropTypes.array,
    onClick: PropTypes.func,
    onSuccess: PropTypes.func,
};

SubmitButton.propTypes = {
    title: PropTypes.string,
    func: PropTypes.func
}
