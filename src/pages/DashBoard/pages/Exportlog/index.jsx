import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExportHistory } from '../../../../redux/material/MaterialSlice'
import { convertISOToDateTime } from '../../../../utils/utils'
import Header from '../../../../components/ModuleHeader'

const ExportLog = props => {
  const dispatch = useDispatch()
  const exportHistory = useSelector(state => state.materials.exports)
  useEffect(() => {
    dispatch(fetchExportHistory())
  }, [])
  return (
    <div>
      <Header title='Exports History' />
      {/* {JSON.stringify(exportHistory)} */}
      <table className='table-auto w-full font-alata'>
        <thead className='tracking-wider'>
          <tr className='text-xl'>
            <th>No. </th>
            <th className='text-left pl-10'>Material ID</th>
            <th>Material Name</th>
            <th>Quantity</th>
            <th>Export Date</th>
          </tr>
        </thead>
        <tbody>
          {exportHistory.map((item, index) => (
            <tr key={index} className='tracking-wide text-gray-600 hover:text-black hover:cursor-pointer border-y-2'>
              <td className='text-center'>{index + 1}</td>
              <td className='text-left p-3 pl-10'>{item.material_id}</td>
              <td className='text-center p-3'>{item.material_name}</td>
              <td className='text-center p-3'>{item.material_quantity}</td>
              <td className='text-center p-3'>{convertISOToDateTime(item.material_export_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ExportLog.propTypes = {}

export default ExportLog