import React from 'react'
import PropTypes from 'prop-types'

const ToggleEditButton = ({click, title}) => {
  return (
    <div onClick={click}>
          {title}
    </div>
  )
}

ToggleEditButton.propTypes = {
          click: PropTypes.func,
          title: PropTypes.string
}

export default ToggleEditButton