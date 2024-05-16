import React from 'react'
import PropTypes from 'prop-types'

const StatusCell = ({isRounded, statusData, statusCode}) => {
   const status = statusData.find(s => s.type_id === statusCode)
  return (
    <div className={'w-full h-full flex items-center place-content-center ' + (isRounded ? 'rounded-lg border-2 bg-hover2' : '')}>
      <span className={status?.type_color ? 'text-[' + status.type_color + '] ' : 'text-red-500'}>
         {status?.type_name}
      </span>
    </div>
  )
}

StatusCell.propTypes = {
   isRounded: PropTypes.bool,
   statusData: PropTypes.array.isRequired,
   statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default StatusCell