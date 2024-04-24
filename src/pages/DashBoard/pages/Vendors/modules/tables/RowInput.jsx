import React, {useState} from 'react'
import PropTypes from 'prop-types'

const RowInput = ({type, name, onChanged}) => {
  return (
    <td className="items-center place-content-center self-center p-2">
      <input className='text-center self-center w-full '
      type={type} 
      name={name} 
      min={type === 'number' ? '0' : undefined}
      placeholder={type === 'number' ? '0' : 'Enter text'}
      onChange={onChanged}
      />
    </td>
  )
}

RowInput.propTypes = {
          name: PropTypes.string,
          type: PropTypes.string,
          initialValue: PropTypes.instanceOf(String, Number),
          onChanged: PropTypes.func,
}

export default RowInput;