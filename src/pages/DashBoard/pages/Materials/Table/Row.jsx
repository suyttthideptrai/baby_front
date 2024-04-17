import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addId, removeId } from "../../../../../redux/material/selectedIdsSlice";
import { addMaterialDetailsContent, toggleHideShowDetails } from "../../../../../redux/material/MaterialSlice";
import { formatMaterialQuantity } from "../../../../../utils/utils";



const Row = ({ data }) => {

  const materialTypes = useSelector(state => state.materials.types);
  const selectedIds = useSelector(state => state.selectedIds);
  //const showDetailsState = useSelector(state => state.materials.showDetails);
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
  const handleClicked = () => {
    dispatch(addMaterialDetailsContent(data));
    dispatch(toggleHideShowDetails());
  }

return (
    <tr className="tracking-wide text-gray-600 hover:text-black hover:cursor-pointer border-y-2">
      <td className="pl-3">
        <input className='w-5 h-5'
          type="checkbox"
          name="product-id"
          onChange={() => handleChecked(data.material_id)}
        />
      </td>
      <td onClick={handleClicked} className="text-left text-black">{data.material_id}</td>
      <td onClick={handleClicked} className="text-left">{data.material_name}</td>
      <td className="text-left">{data.material_unit_of_measure}</td>
      <td className="text-left">{formatMaterialQuantity(data.material_quantity)}</td>
      <td className="p-3 text-center">{getMaterialGroupName(data.material_type)}</td>
    </tr>
  );
};

Row.propTypes = {
data: PropTypes.shape({
    material_id: PropTypes.string.isRequired,
    material_name: PropTypes.string.isRequired,
    material_unit_of_measure: PropTypes.string.isRequired,
    material_quantity: PropTypes.number.isRequired,
    material_type: PropTypes.number.isRequired
}).isRequired,
toggleChecked: PropTypes.func,
isChecked: PropTypes.bool
};

export default Row;