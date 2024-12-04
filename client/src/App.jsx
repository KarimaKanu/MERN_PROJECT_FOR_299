


import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import ClientProfile from "./pages/clientProfile";
import Registration from "./Pages/Registration";
import PrivateRoute from "./Components/PrivateRoute";
import CounselorRegistration from "./Pages/CounselorRegistration";
import CounselorSignin from "./Pages/CounselorSignin";
import PrivateRouteCounselor from "./Components/PrivateRouteCounselor";
import CounselorProfile from "./pages/CounselorProfile";
import About from "./pages/about";
import AdminSignin from "./Pages/AdminSignin";
import AdminProfile from "./Pages/AdminProfile";
import AdminSignup from "./Pages/AdminSignup";
import AdminCounselorAccess from "./Pages/AdminCounselorAccess";
import AdminClientAccess from "./Pages/AdminClientAccess";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
import AdminHeader from "./Components/AdminHeader";
import CounselorAppointments from "./Pages/Appointments";
import CounselorHeader from "./Components/CounselorHeader";
import ClientHeader from "./Components/ClientHeader";
import ClientPassChange from "./Pages/ClientPassChange";
import CounselorPassChange from "./Pages/CounselorPassChange";
import AdminPassChange from "./Pages/AdminPassChange";
import CounselorLists from "./Components/CounselorLists";
import MyAppointments from "./Pages/MyAppointments";
import Appointments from "./Pages/Appointments";
import ShowCounselors from "./Pages/ShowCounselors";
import ProfileCl from "./Pages/ProfileCl";
import ProfileCounselor from "./Pages/ProfileCounselor";


// Admin Layout
const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};
const CounselorLayout = () => {
  return (
    <>
      <CounselorHeader />
      <Outlet />
    </>
  );
};
const ClientLayout = () => {
  return (
    <>
      <ClientHeader />
      <Outlet />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      {/* Main Header */}
      <Header />

      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
     
        <Route path="/counselor_lists" element={<CounselorLists />} />
        <Route path="/counselor-appointments/:id" element={<CounselorAppointments />} />
        
        <Route element={<PrivateRoute />}>
        <Route path="/appointment/:docId" element={<Appointments />} />
        <Route element={<ClientLayout />}>
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/client-pass-change" element={<ClientPassChange />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/show-counselors" element={<ShowCounselors />} />
          <Route path="/profile-cl" element={<ProfileCl />} />
          
        </Route></Route>
        <Route path="/counselor-signin" element={<CounselorSignin />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<PrivateRouteCounselor />}>
        <Route element={<CounselorLayout />}>
          <Route path="/counselor-profile" element={<CounselorProfile />} />
          <Route path="/profile-counselor" element={<ProfileCounselor />} />

          <Route path="/counselor-pass-change" element={<CounselorPassChange />} />

        </Route></Route>

        {/* Admin Routes */}
        <Route path="/admin-signin" element={<AdminSignin />} />

        {/* Protected Admin Routes */}
        <Route element={<PrivateRouteAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/counselor-registration" element={<CounselorRegistration />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/admin-counselor-access" element={<AdminCounselorAccess />} />
            <Route path="/admin-client-access" element={<AdminClientAccess />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/admin-pass-change" element={<AdminPassChange />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

