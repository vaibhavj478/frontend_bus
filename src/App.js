import "./App.css";

import { Route, Routes } from "react-router-dom";

import BusSeatSelection from "./pages/BusSeatSelection";
import NotFound from "./pages/NotFound";


import BusTicketQr from "./pages/BusTicketQr";
// toster
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRScanner from "./pages/QRScanner";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<BusSeatSelection />} />
        <Route path="/qr-code/:id" element={<BusTicketQr />} />
        <Route path="/scan" element={<QRScanner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
