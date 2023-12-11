
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Payment from "./Pages/Deposit/Payment";
import ScrollToTop from "./Components/ScrollToTop";
import UserUpdate from "./Updateuser/Oldfile/Updateuser";
import Verification from "./Pages/Otp/Verification";
import ResetPassword from "./Pages/Auth/ResetPassword";


const App = () => {
  return (
    <>
        <HashRouter>
          <ScrollToTop/>
          <Routes>
            <Route path="/:id" element={<Dashboard/>} />
            <Route path=":id/verification" element={<Verification/>} />
            <Route path=":id/payment/:paymentname" element={<Payment/>} />
            <Route path=":id/:UserUpdate" element={<UserUpdate/>} />
            <Route path='restLink/:userid' element={<ResetPassword/>}/></Routes>
        </HashRouter>
    </>
  );
}

export default App;
