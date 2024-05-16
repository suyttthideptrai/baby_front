import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { useState } from "react";
import NavBar from './NavBar';
import TopBar from './TopBar';
import Settings from './Settings';

import MaterialsPage from "./pages/Materials";
import ExportLog from './pages/Exportlog';
import PurchasingOrdersPage from "./pages/PurchasingOrders";
import GoodReceiptsPage from './pages/GoodReceipts';
import ReceiptDetails from './pages/GoodReceipts/modules/ReceiptDetails'
import VendorsPage from "./pages/Vendors";
import VendorDetails from './pages/Vendors/modules/VendorDetails';
import UsersPage from "./pages/Users";
import AboutPage from "./pages/About";
import Logout from '../Login/Logout';
import OrderDetailsCreate from './pages/PurchasingOrders/modules/OrderDetailsCreate';
import CreateOrder from './pages/PurchasingOrders/modules/CreateOrder';
import WelcomePage from './pages/Welcome';
import Unauthorized from './pages/Unauthorized';

import RequiredRole from './RequiredRole';
import { ROLES } from '../../utils/constant';

function DashBoardPage() {
  const [settingsVisibility, setSettingsVisibility] = useState(false)
  const toggleSettingsVisibility = () => {
    setSettingsVisibility(!settingsVisibility)
  }
  
  
  return (
    <BrowserRouter>
        <div className='overflow-clip'>
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
            <div className='flex-grow items-start h-[92%]'>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route element={<RequiredRole allowedRoles={[ROLES.IND, ROLES.ADM]} />}>
                  <Route path="/materials" element={<MaterialsPage />} />
                  <Route path="/exports" element={<ExportLog />} />
                  <Route path="/receipts" element={<GoodReceiptsPage />} />
                  <Route path="/receipts/details" element={<ReceiptDetails />}/>
                  <Route path="/orders/details" element={<OrderDetailsCreate isCreate={false} />} />
                </Route>
                <Route element={<RequiredRole allowedRoles={[ROLES.PUD, ROLES.ADM]} />}>
                  <Route path="/orders" element={<PurchasingOrdersPage />} />
                  <Route path="/orders/new" element={<CreateOrder />} />
                </Route>
                <Route element={<RequiredRole allowedRoles={[ROLES.ADM]} />}>
                  <Route path="/vendors" element={<VendorsPage />} />
                  <Route path="/vendors/details" element={<VendorDetails />} />
                  <Route path="/user" element={<UsersPage />} />
                </Route>
                {/* <Route path="/about" element={<AboutPage />} /> */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Routes>
            </div>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default DashBoardPage;