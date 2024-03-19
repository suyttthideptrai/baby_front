import React from 'react'
import BurgerIcon from '../../assets/icons/union_x2.svg'

export const index = () => {
  return (
    <>
        <div className='
 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
 bg-[#4285F4]
 absolute
 left-[0px]
 top-[0px]
 right-[0px]
 flex
 flex-row
 justify-between
 p-[15px_30.3px_15px_21.4px]
 box-sizing-border
'>
            <div className="flex flex-row box-sizing-border">
                <img className='w-[26.3px] h-[17.5px]' src={BurgerIcon} alt="" />
                <span className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] break-words font-['Gilroy-Heavy','Roboto_Condensed'] font-normal text-[35px] capitalize text-[#FFFFFF]">
                    BabySmile 
                </span>          
            </div>
        </div>
    </>
  )
}
