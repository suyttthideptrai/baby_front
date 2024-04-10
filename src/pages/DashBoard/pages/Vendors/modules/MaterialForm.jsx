import React, { useState } from 'react';
import FormInput from '../../../../../components/FormInput';
import Dropdown from '../../../../../components/DropDown';
import axios from 'axios';
import PropTypes from 'prop-types';
import xIcon from '../../../../../assets/icons/crud/x_icon.svg';

const MaterialForm = ({ types, onSuccess, onClick }) => {
  const [materialData, setMaterialData] = useState({
    material_id: '',
    material_name: '',
    material_unit_of_measure: '',
    material_warehouse_date: '',
    material_type_id: 1,
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
        material_id: '',
        material_name: '',
        material_unit_of_measure: '',
        material_warehouse_date: '',
        material_type_id: 1,
      });
    } catch (error) {
      console.error('Error adding material:', error);
      alert('Error adding material. Please try again.');
    }
  };

  return (
    <div className='bg-primary w-3/4 border-2'>
      <div className='flex place-content-between'>
        <h2 className='font-bold text-lg p-3 text-center text-white'>Create New Material</h2>
        <img className='w-6 mr-5 cursor-pointer' onClick={handleClick} src={xIcon} alt="" />
      </div>
      <form className='bg-white' onSubmit={handleSubmit}>
        <div className='flex space-x-16'>
            <div>
                <FormInput
                id="material_id"
                label="Material ID"
                name="material_id"
                value={materialData.material_id}
                onChange={handleChange}
                required
                />
                {/* Material Name */}
                <FormInput
                id="material_name"
                label="Material Name"
                name="material_name"
                value={materialData.material_name}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                {/* Unit of Measure */}
                <FormInput
                id="material_unit_of_measure"
                label="Unit of Measure"
                name="material_unit_of_measure"
                value={materialData.material_unit_of_measure}
                onChange={handleChange}
                required
                />
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
                <div className='flex mt-2 ml-5'>
                    <label className='font-bold min-w-40'>Material Type (*)</label>
                    <Dropdown options={types} selectedOption={materialData.material_type_id} onChange={handleDropdownChange} />
                </div>
            </div>
        </div>
        <SubmitButton title={"Add Material"} />
      </form>
    </div>
  );
};

const SubmitButton = ({title, func}) => {
    const handleSubmit = () => {
        func();
    }
    return (
        <div className='p-5'>
            <button onClick={handleSubmit} className='w-auto border p-2 rounded-lg bg-[#4285F4] text-white font-bold' type="submit">{title}</button>
        </div>
    )
}


export default MaterialForm;

MaterialForm.propTypes = {
    types: PropTypes.array,
    onClick: PropTypes.func,
    onSuccess: PropTypes.func,
};

SubmitButton.propTypes = {
    title: PropTypes.string,
    func: PropTypes.func
}
