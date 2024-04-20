import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addId, removeId } from '../../../../../../redux/material/selectedIdsSlice';
//import { addMaterialDetailsContent, toggleHideShowDetails } from "../../../../../../redux/material/MaterialSlice";

const SuppliedTable = ({ initialData, editable }) => {

  const dispatch = useDispatch();

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      initialData.forEach((item) => {
        dispatch(addId(item.material_id));
      });
    } else {
      initialData.forEach((item) => {
        dispatch(removeId(item.material_id));
      });
    }
  };
  

  return (
    <div className='w-full overflow-auto p-5'>
      <table className='table-auto w-full'>
        <thead className='tracking-wider'>
          <tr className='space-x-2'>
            <th className='w-10 h-10 text-center items-center place-content-center bg-hover2'>
              {
                editable &&
                <input className='w-5 h-5' type="checkbox" onChange={handleSelectAll}/>
              }
            </th>
            {/* <th className='w-[10%]'>Material ID</th> */}
            <th className='w-[20%] bg-hover2'>Material Name</th>
            <th className='w-[20%] bg-hover2'>Unit of Measure</th>
            <th className='w-[20%] bg-hover2'>Price (VND)</th>
            <th className='w-auto bg-hover2'>Group Material</th>
          </tr>
        </thead>
        <tbody id="checkbox-container">
          {initialData.map(item => (
            <Row
              key={item.material_id}
              data={item}
              editable={editable}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row = ({ data, editable }) => {
          const materialTypes = useSelector(state => state.materials.types);
          const selectedIds = useSelector(state => state.selectedIds);
          const dispatch = useDispatch();
        
          //material types
          const getMaterialGroupName = (groupId) => {
            const materialGroup = materialTypes.find(group => group.type_id === groupId);
            return materialGroup ? materialGroup.type_name.trim() : 'Unknown';
          };
        
          //selected Ids
          const handleChecked = (id) => {
            console.log('handling check with redux: ' + id)
            if(selectedIds.selected_ids.includes(id)){
              dispatch(removeId(id))
            }else{
              dispatch(addId(id));
            }
          }
        
          //show details
          // const handleClicked = () => {
          //   dispatch(addMaterialDetailsContent(data));
          //   dispatch(toggleHideShowDetails());
          // }
        
        return (
          <tr className="tracking-wide text-gray-600 hover:text-black border-y-2">
          {/* {
                    editable &&
                    <td className="pl-3">
                              <input className='w-5 h-5'
                              type="checkbox"
                              name="product-id"
                              onChange={() => handleChecked(data.material_id)}
                              />
                    </td>
          } */}
          <td className="w-5 h-5 text-center items-center place-content-center">
              {
                editable &&
                <input className='w-5 h-5'
                  type="checkbox"
                  name="product-id"
                  onChange={() => handleChecked(data.material_id)}
                />
              }
          </td>
          <td className="text-center">{data.material_name}</td>
          <td className="text-center">{data.material_unit_of_measure}</td>
          <td className="text-center">{data.material_price}</td>
          {/* <td className="text-center">{data.material_quantity == -1 ? "NOT EXIST" : data.material_quantity}</td> */}
          <td className="text-center p-3">{getMaterialGroupName(data.material_type)}</td>
        </tr>
        )
};
        
Row.propTypes = {
data: PropTypes.shape({
          material_id: PropTypes.string.isRequired,
          material_name: PropTypes.string.isRequired,
          material_unit_of_measure: PropTypes.string.isRequired,
          material_price: PropTypes.number.isRequired,
          material_type: PropTypes.number.isRequired
}).isRequired,
toggleChecked: PropTypes.func,
isChecked: PropTypes.bool,
editable: PropTypes.bool
};

SuppliedTable.propTypes = {
  initialData: PropTypes.array.isRequired,
  editable: PropTypes.bool
};

export default SuppliedTable;
