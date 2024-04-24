import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Logout from "../Login/Logout";
import NavItem from "./NavItem";
import MatIcon from "../../assets/icons/sidebar/materialIcon_x2.svg"
import OrderReqIcon from "../../assets/icons/sidebar/orderIcon_x2.svg"
import PurchOrder from "../../assets/icons/sidebar/group_x2.svg"
import InventoryIcon from "../../assets/icons/sidebar/vector23_x2.svg"
import VendorsIcon from "../../assets/icons/sidebar/vendors.svg"
import UsersIcon from "../../assets/icons/sidebar/vector_x2 (2).svg"
import LogoutIcon from "../../assets/icons/sidebar/logout.svg"
import AboutIcon from "../../assets/icons/sidebar/financialPlanning_x2.svg"



export default function Navbar() {
    const location = useLocation();
    // const dispatch = useDispatch();
    const [path, setPath] = useState("");
    const navigate = useNavigate();

    const navItems = [
        { path: '/materials', name: 'Materials', icon: MatIcon },
        { path: '/vendors', name: 'Vendors', icon: VendorsIcon },
        // { path: '/order-reqs', name: 'Order Requirement Management', icon: OrderReqIcon },
        { path: '/purch-orders', name: 'Purchasing Orders', icon: AboutIcon },
        { path: '/inventory', name: 'Goods Receipts', icon: UsersIcon },
        // { path: '/users', name: 'User Management', icon: InventoryIcon }
      ];

    useEffect(( ) => {
        setPath(location.pathname)
    }, [location])
    return (
        <div className={"bg-[#4285F4] h-screen select-none"}>
            <div className='text-center self-start'>
                <span className="
                    font-popins
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
                    <NavItem key={index} path={item.path} name={item.name} icon={item.icon} />
                ))}
                </ul>
                <ul className="flex flex-col space-y-3">
                    <NavItem path="/about" name="Settings" icon={PurchOrder} /*css={"bg-[#525252] bg-opacity-50 hover:bg-opacity-100"} */ />
                    <NavItem path="/logout" name="Log Out" icon={LogoutIcon}/>
                </ul>
            </div>

        </div>

    );
}
