import React from 'react'
import GearIcon from '../../assets/icons/topbar/gear.svg';
import BellIcon from '../../assets/icons/topbar/bell.svg';
import GlobeIcon from '../../assets/icons/topbar/globe.svg';
import PersonIcon from '../../assets/icons/topbar/person.svg';
import BurgerIcon from '../../assets/icons/topbar/burger.svg';
import WhiteLogo from '../../assets/symbols/Logo_White.svg';
import PropTypes from 'prop-types';

const TopBar = ({gearFunc, bellFunc, globeFunc, profileFunc, toggleFunc, notifications}) => {
  return (
    <div className='font-alata flex h-auto p-2 bg-[#4285F4] w-screen items-center place-content-between'>
        <div className='justify-self-start self-end'>
            <div className='ml-2 '>
                <img className='w-24' src={WhiteLogo} alt="" />
            </div>
        </div>
        <div className='flex items-center gap-x-16'>
            <div className='flex gap-x-8'>
                <TopItem icon={GearIcon} number={9} func={gearFunc}/>
                <TopItem icon={BellIcon} number={0} func={bellFunc}/>
                <TopItem icon={GlobeIcon} number={0} func={globeFunc}/>
            </div>
            <div className='flex gap-x-2 items-center'>
                <img className='w-8' src={PersonIcon} alt="" />
                <div className='text-white'>
                    <span>Nguyen Van A</span>
                </div>
            </div>
            <div className='mr-9'>
                <TopItem icon={BurgerIcon} number={0} func={toggleFunc}/>
            </div>
        </div>
    </div>
  )
}

const TopItem = ({icon, number, func}) => {
    const handleOnclick = () =>{
        func()
    }
    const hasNumber = (number) => {
        if(number > 0) return true;
    }
    return (
        <div onClick={handleOnclick} className='
        p-[5px] 
        w-10
        cursor-pointer 
        hover:bg-[#525252] 
        hover:bg-opacity-30 
        duration-200
        self-center
        rounded-md'>
            <img className='w-8' src={icon} alt="" />
            {
                hasNumber() ?     
                <div>
                    {number}
                </div> :
                ''
            }
        </div>
    )
}

TopItem.propTypes = {
    icon: PropTypes.string.isRequired,
    number: PropTypes.number,
    func: PropTypes.func
}

TopBar.propTypes = {
    notifications: PropTypes.arrayOf(Number),
    gearFunc: PropTypes.func, 
    bellFunc: PropTypes.func, 
    globeFunc: PropTypes.func, 
    profileFunc: PropTypes.func, 
    toggleFunc : PropTypes.func
  };

export default TopBar