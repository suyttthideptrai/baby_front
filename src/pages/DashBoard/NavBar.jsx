import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Logout from "../Login/Logout";
import NavItem from "./NavItem";
import VendorsIcon from "../../assets/icons/sidebar/vendors.svg"
import LogoutIcon from "../../assets/icons/sidebar/logout.svg"
import ExportIcon from "../../assets/icons/crud/export_icon.svg"

import MaterialIcon from '../../assets/icons/sidebar/nav_materials.svg'
import OrderIcon from '../../assets/icons/sidebar/nav_orders.svg'
import ReceiptIcon from '../../assets/icons/sidebar/nav_receipts.svg'
import GearIcon from '../../assets/icons/topbar/gear.svg'



export default function Navbar() {
    const location = useLocation();
    // const dispatch = useDispatch();
    const [path, setPath] = useState("");
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState(null);

    const navItems = [
        { path: '/materials', name: 'Materials', icon: MaterialIcon },
        { path: '/exports', name: 'Exports History', icon: ExportIcon },
        { path: '/vendors', name: 'Vendors', icon: VendorsIcon },  
        { path: '/orders', name: 'Purchasing Orders', icon: OrderIcon },
        { path: '/receipts', name: 'Goods Receipts', icon: ReceiptIcon },
        // { path: '/users', name: 'User Management', icon: InventoryIcon }
      ];

    useEffect(( ) => {
        setPath(location.pathname)
    }, [location])

    const handleSetActiveNav = (path) => {
        setActiveNav(path);
    }
    return (
        <div className={"bg-[#4285F4] h-screen select-none"}>
            <div className='text-center self-start'>
                <span className="
                    font-gilroy
                    font-extrabold
                    pl-5 pr-5 
                    text-[48px]
                    capitalize
                    text-[#fff]" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                        BabySmile
                </span>
            </div>
            <div className="font-popins text-[16px] flex flex-col place-content-between h-[70%]">
                <ul className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                    <NavItem 
                        key={index} 
                        path={item.path} 
                        name={item.name} 
                        icon={item.icon}
                        activeNav={activeNav}
                        onClick={handleSetActiveNav}
                    />
                ))}
                </ul>
                <ul className="flex flex-col space-y-3">
                    {/* <NavItem path="/users" name="Manage Users" icon={InventoryIcon}/> */}
                    <NavItem path="/about" name="Settings" icon={GearIcon} onClick={handleSetActiveNav} />
                    <NavItem path="/logout" name="Log Out" icon={LogoutIcon}/>
                </ul>
            </div>

        </div>

    );
}
