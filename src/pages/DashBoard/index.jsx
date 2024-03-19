import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { createContext, useState } from "react";
import DataContext from "../../components/context/DataContext";
import PopupContext from "../../components/context/PopupContext";
import Popup from '../../components/Popup'
import NavBar from './NavBar';

import MaterialsPage from "./pages/Materials";
import OrderRequirementPage from "./pages/OrderRequirements";
import PurchasingOrdersPage from "./pages/PurchasingOrders";
import InventoryPage from "./pages/Inventory";
import VendorsPage from "./pages/Vendors";
import UsersPage from "./pages/Users";
import AboutPage from "./pages/About";
import LoginPage from '../Login';

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
          <NavBar/>
          <Routes>
            <Route path="/" element={<LoginPage />} />
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