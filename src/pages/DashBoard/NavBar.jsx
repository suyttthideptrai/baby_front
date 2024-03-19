import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'


export default function Navbar() {
    const location = useLocation();
    const [path, setPath] = useState("");
    const navigate = useNavigate();

    useEffect(( ) => {
        setPath(location.pathname)
    }, [location])
    return (
        <>

            <div className="container">
                {/* <div className="app-name" onClick={backToHome}>Game Theory & Matching Theory Solver</div>
                <div className="nav-item-container">
                    <Link to='/' className={path == "/" ? "nav-item highlight" : 'nav-item'}>Game Theory</Link> 
                    <Link to='/matching-theory/input' className={path == "/matching-theory/input" ? "nav-item highlight" : 'nav-item'}>Matching Problem</Link>
                    <Link to='/guide' className={path == "/guide" ? "nav-item highlight" : 'nav-item'}>Guide</Link>
                    <div className={path == "/about" ? "nav-item highlight" : 'nav-item'}>About</div>
                </div> */}
                <ul className="flex flex-col">
                    <Link to="/materials">Material Management</Link>
                    <Link to="/order-reqs">Order Requirement Management</Link>
                    <Link to="/purch-orders">Purchasing Order Management</Link>
                    <Link to="/inventory">Inventory Management</Link>
                    <Link to="/vendors">Vendor Management</Link>
                    <Link to="/users">User Management</Link>
                </ul>
                <ul className="flex flex-col">
                    <Link to="/about">About</Link>
                    <a href="/">Logout</a>
                </ul>
            </div>

        </>

    );
}
