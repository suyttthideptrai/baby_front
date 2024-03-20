import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { createContext, useState } from "react";
import DataContext from "../../components/context/DataContext";
import PopupContext from "../../components/context/PopupContext";
import Popup from '../../components/Popup'
import NavBar from './NavBar';
import TopBar from './TopBar';

import MaterialsPage from "./pages/Materials";
import OrderRequirementPage from "./pages/OrderRequirements";
import PurchasingOrdersPage from "./pages/PurchasingOrders";
import InventoryPage from "./pages/Inventory";
import VendorsPage from "./pages/Vendors";
import UsersPage from "./pages/Users";
import AboutPage from "./pages/About";
import LoginPage from '../Login';

import WhiteLogo from '../../assets/symbols/Logo_White.svg'

function DashBoardPage( handleLogout ) {
  const [appData, setAppData] = useState(null)
  const [guideSectionIndex, setGuideSectionIndex] = useState(0)
  const [popupError, setPopupError] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupMessage, setPopupMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [popupOkCallBack, setPopupOkCallBack] = useState()
  const displayPopup = (title, message, error) => {
    setShowPopup(true)
    setPopupTitle(title)
    setPopupMessage(message)
    if (error) {
      setPopupError(error)
    }
  }
  
  return (
    <BrowserRouter>
      <DataContext.Provider value={{ appData, setAppData, guideSectionIndex, setGuideSectionIndex }}>
      <PopupContext.Provider value={{ displayPopup }}>
        <div className="flex flex-row">
          <div>

          </div>
          <div className='bg-[#4285F4] h-screen'>
            <div>
              <img src={WhiteLogo} alt="" />
            </div>
            <div className='text-center'>
              <span className="
                
                font-['Roboto_Condensed']
                font-extrabold
                text-[38px]
                capitalize
                text-[#fff]" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                    BabySmile
              </span>
            </div>
            <NavBar/>
          </div>
          <div className='flex flex-col'>
            <div className='items-start'>
              <TopBar />
            </div>
            <div className='flex-grow items-start'>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/materials" element={<MaterialsPage />} />
                <Route path="/order-reqs" element={<OrderRequirementPage />} />
                <Route path="/purch-orders" element={<PurchasingOrdersPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/vendors" element={<VendorsPage />} />
                <Route path="/user" element={<UsersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/logout" element={<AboutPage />} />
              </Routes>
            </div>
          </div>
        </div>

        <Popup 
            isShow={showPopup}
            setIsShow={setShowPopup}
            title={popupTitle}
            message={popupMessage}
            error={popupError}
            okCallback={popupOkCallBack}
          />
      </PopupContext.Provider>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default DashBoardPage;