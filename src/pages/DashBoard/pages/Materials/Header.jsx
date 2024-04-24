import React from 'react'
import deleteIcon from '../../../../assets/icons/crud/delete_icon.svg'
import editIcon from '../../../../assets/icons/crud/edit_icon.svg'
import addIcon from '../../../../assets/icons/crud/add_icon.svg'
import exportIcon from '../../../../assets/icons/crud/export_icon.svg'
import PropTypes from 'prop-types';


const Header = ({ onDelete, onEdit, onAdd }) => {
    const handleDelete = () => {
        onDelete();
    }
    const handleEdit = () => {
        onEdit();
    }
    const handleAdd = () => {
        onAdd();
    }
  return (
    <div className='grid
    grid-cols-2 
    h-16
    p-5
    items-center'>
        <p className='font-bold text-xl'>
            Material List
        </p>
        <div className='flex justify-self-end gap-x-6 items-center'>
            <HeaderButton icon={exportIcon} title={"Export"} css={"bg-secondary hover:bg-hover2"} />
            <HeaderButton icon={deleteIcon} title={"Delete"} onClick={handleDelete} css={"bg-secondary hover:bg-[#EAECF0]"}/>
            <HeaderButton icon={editIcon} title={"Edit"} onClick={handleEdit} css={"bg-secondary hover:bg-[#EAECF0]"}/>
            {/* <HeaderButton icon={addIcon} title={"Add new material"} onClick={handleAdd} css={"bg-[#4285F4] hover:bg-[#525252] hover:bg-opacity-50 text-white"}/> */}
        </div>
    </div>
  )
}

export default Header

const HeaderButton = ({ icon, title, onClick, css }) => {
    
    const handleClick = () => {
        onClick()
    }

    return (
    <div className={"flex p-3 gap-x-2 rounded-md select-none cursor-pointer duration-200 font-bold " + css } onDoubleClick={handleClick}>
        <img className='w-5' src={icon} alt="" />
        <span>{title}</span>
    </div>)
}

Header.propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onAdd: PropTypes.func
};
HeaderButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    css: PropTypes.string
  };