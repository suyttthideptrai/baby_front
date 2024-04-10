import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Status = ({status}) => {
          // const [textColor, setTextColor] = useState('text-black')
          const getColor = (status) => {
                    switch (status) {
                              case 'ACTIVE':
                                        return 'text-green-500'
                              case 'INACTIVE':
                                        return 'text-red-500'
                              case 'INORDER':
                                        return 'text-yellow-500'
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