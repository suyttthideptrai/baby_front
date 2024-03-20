import React from 'react'
import GearIcon from '../../assets/icons/topbar/gear.svg';
import BellIcon from '../../assets/icons/topbar/bell.svg';
import GlobeIcon from '../../assets/icons/topbar/globe.svg';
import PersonIcon from '../../assets/icons/topbar/person.svg';
import BurgerIcon from '../../assets/icons/topbar/burger.svg';

const TopBar = () => {
  return (
    <div>
        <div>
            <img src={GearIcon} alt="" />
            <img src={BellIcon} alt="" />
            <img src={GlobeIcon} alt="" />
        </div>
        <div>
            <img src={PersonIcon} alt="" />
            <div>
                <span>Nguyen Van A</span>
            </div>
        </div>
        <div>
            <img src={BurgerIcon} alt="" />
        </div>
    </div>
  )
}

export default TopBar