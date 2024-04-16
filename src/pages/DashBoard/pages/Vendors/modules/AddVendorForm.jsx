import React, { useState } from 'react';
import FormInput from '../../../../../components/FormInput';
import axios from 'axios';
import PropTypes from 'prop-types';
import xIcon from '../../../../../assets/icons/crud/x_icon.svg';

const VendorForm = ({ onSuccess, click }) => {
  const [vendorData, setVendorData] = useState({
    vendor_id: '',
    vendor_name: '',
    vendor_phone: '',
    vendor_email: '',
    vendor_address: '',
    vendor_tax_code: '',
    // vendor_status: 'ACTIVE',
  });

  // const vendor_status = [
  //   "ACTIVE", "INACTIVE", "INORDER"
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };
  const handleClick = () => {
    click();
    console.log('click');
  };

  // const handleDropdownChange = (selectedValue) => {
  //   setVendorData({ ...vendorData, vendor_status: selectedValue });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9999/api/crud/vendor/add', vendorData);
      alert('Vendor successfully added to the system.');
      setVendorData({
        vendor_name: '',
        vendor_phone: '',
        vendor_email: '',
        vendor_address: '',
        vendor_tax_code: '',
        //vendor_status: 'ACTIVE',
      });
      //handle success adding
      onSuccess();
    } catch (error) {
      alert('Error adding vendor. Please try again.');
    }
  };

  return (
    <div className='p-1 w-[72%] h-auto bg-primary fixed ml-5'>
      <div className='bg-[#4285F4] flex place-content-between'>
        <h2 className='font-bold text-lg p-1 text-center text-white'>Add New Vendor</h2>
        <img className='w-6 mr-5 cursor-pointer' onClick={handleClick} src={xIcon} alt="" />
      </div>
      {/* {JSON.stringify(vendorData)} */}
      <div className='bg-white'>
      <form onSubmit={handleSubmit}>
        <div className='flex place-content-around'>
            <div className='w-[40%]'>
                <FormInput
                id="vendor_name"
                label="Vendor Name"
                name="vendor_name"
                value={vendorData.vendor_name}
                onChange={handleChange}
                required
                />
                <FormInput
                id="vendor_phone"
                label="Vendor Phone"
                name="vendor_phone"
                value={vendorData.vendor_phone}
                onChange={handleChange}
                required
                />
                <SubmitButton title={"Create"} />
            </div>

            <div className='w-[40%]'>
                {/* Unit of Measure */}
                <FormInput
                id="vendor_email"
                label="Vendor Email"
                name="vendor_email"
                value={vendorData.vendor_email}
                onChange={handleChange}
                required
                />
                {/* Warehouse Date */}
                <FormInput
                id="vendor_address"
                label="Vendor Address"
                name="vendor_address"
                value={vendorData.vendor_address}
                onChange={handleChange}
                required
                type="text"
                />
                {/* <div className='flex mt-2 ml-5'>
                    <label className='font-bold min-w-40'>Vendor Status (*)</label>
                    <Dropdown options={vendor_status} selectedOption={"ACTIVE"} onChange={handleDropdownChange} />
                </div> */}
                <FormInput
                id="vendor_tax_code"
                label="Vendor Tax Code"
                name="vendor_tax_code"
                value={vendorData.vendor_tax_code}
                onChange={handleChange}
                required
                type="text"
                />
            </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export const SubmitButton = ({title, func}) => {
    const handleSubmit = () => {
        func();
    }
    return (
        <div className='p-5'>
            <button onClick={handleSubmit} className='
            w-auto 
            border 
            mt-5
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


export default VendorForm;

const Dropdown = ({ options, selectedOption, onChange }) => {
    
    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      onChange(selectedValue);
    };
  
    return (
      <select className='border-2 bg-[#f4f5f7]' value={selectedOption} onChange={handleSelectChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  Dropdown.propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
          type_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          type_name: PropTypes.string
      })
    ).isRequired,
    selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired
  };

VendorForm.propTypes = {
    click: PropTypes.func,
    onSuccess: PropTypes.func,
};

SubmitButton.propTypes = {
    title: PropTypes.string,
    func: PropTypes.func
}
