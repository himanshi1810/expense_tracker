import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./Components/Common/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import EmailVerificarion from "./Pages/EmailVerificarion";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import AboutUser from "./Components/Core/Dashboard/User/AboutUser";
import Group from "./Components/Core/Dashboard/Group/Group";
import Settings from "./Components/Core/Dashboard/User/Settings";
import AboutExpene from "./Components/Core/Dashboard/Expense/AboutExpene";
import AboutGroup from "./Components/Core/Dashboard/Group/AboutGroup";
import UpdateGroup from "./Components/Core/Dashboard/Group/UpdateGroup";
import BalanceSheet from "./Components/Core/Dashboard/Group/BalanceSheet";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} =  useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-black-400 flex flex-col font-poppins">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contactUs" element={<ContactUs></ContactUs>}></Route>
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}></SignUp>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/changePassword/:id" element={<ChangePassword></ChangePassword>}></Route>
        <Route path="/emailVerification" element={<EmailVerificarion></EmailVerificarion>}></Route>
        <Route element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/dashboard/aboutUser" element={<AboutUser></AboutUser>}></Route>
          <Route path="/dashboard/group" element={<Group></Group>}></Route>
          <Route path="/dashboard/settings" element={<Settings></Settings>}></Route>
          {
            user!==null && (
              <>
                <Route path="/dashboard/aboutExpense/:id" element={<AboutExpene></AboutExpene>}></Route>
                <Route path="/dashboard/aboutGroup/:id" element={<AboutGroup></AboutGroup>}></Route>
                <Route path="/dashboard/aboutGroup/updateGroup/:id" element={<UpdateGroup></UpdateGroup>}></Route>
                <Route path="/dashboard/aboutGroup/balanceSheet/:id" element={<BalanceSheet></BalanceSheet>}></Route>
              </>
            )
             
          }
        </Route>
      </Routes>

    </div>
  );
}

export default App;
