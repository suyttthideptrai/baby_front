import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { useState } from "react";
import NavBar from './NavBar';
import TopBar from './TopBar';
import Settings from './Settings';

import MaterialsPage from "./pages/Materials";
import OrderRequirementPage from "./pages/OrderRequirements";
import PurchasingOrdersPage from "./pages/PurchasingOrders";
import InventoryPage from "./pages/Inventory";
import VendorsPage from "./pages/Vendors";
import VendorDetails from './pages/Vendors/modules/VendorDetails';
import UsersPage from "./pages/Users";
import AboutPage from "./pages/About";
import LoginPage from '../Login';
import Logout from '../Login/Logout';
import App from '../../App';

function DashBoardPage() {
  const [settingsVisibility, setSettingsVisibility] = useState(false)
  const toggleSettingsVisibility = () => {
    setSettingsVisibility(!settingsVisibility)
    console.log("Toggle settings visibility")
  }
  
  
  return (
    <BrowserRouter>
        <div>
          <div className='items-start'>
              <TopBar toggleFunc={toggleSettingsVisibility} />
          </div>
          <div className='flex'>
            <div className=''>
              <NavBar/>
            </div>
            <div className={`transition-opacity duration-500 ${settingsVisibility ? '' : 'opacity-0 pointer-events-none'}`}>
              {settingsVisibility && (
                <div className='fixed right-10 mt-3 rounded-lg border-2 border-gray'>
                <Settings />
                </div> 
              )}
            </div>
            <div className='flex-grow items-start p-5 ml-5'>
              <Routes>
                {/* <Route path="/" element={<App />} /> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/materials" element={<MaterialsPage />} />
                <Route path="/order-reqs" element={<OrderRequirementPage />} />
                <Route path="/purch-orders" element={<PurchasingOrdersPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/vendors" element={<VendorsPage />} />
                <Route 
                    path="/vendors/details" 
                    element={<VendorDetails />} 
                  />
                <Route path="/user" element={<UsersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default DashBoardPage;