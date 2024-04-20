import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Status = ({status}) => {
          // const [textColor, setTextColor] = useState('text-black')
          const getColor = (status) => {
                    switch (status) {
                              case 'ACTIVE':
                                        return 'text-[#3DBC59]'
                              case 'INACTIVE':
                                        return 'text-[#B13028]'
                              case 'INORDER':
                                        return 'text-[#2374DB]'
                              default:
                                        return 'text-black'
                            }
                            
          }
  return (
          <div className={"text-center " + (getColor(status))}>
          {status}
          </div>
  )
}

Status.propTypes = {
          status: PropTypes.string
}

export default Status