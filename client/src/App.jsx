


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

// Admin Layout
const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
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
        <Route element={<PrivateRoute />}>
          <Route path="/client-profile" element={<ClientProfile />} />
        </Route>
        <Route path="/counselor-signin" element={<CounselorSignin />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/counselor-registration" element={<CounselorRegistration />} />
        <Route element={<PrivateRouteCounselor />}>
          <Route path="/counselor-profile" element={<CounselorProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin-signin" element={<AdminSignin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* Protected Admin Routes */}
        <Route element={<PrivateRouteAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/admin-counselor-access" element={<AdminCounselorAccess />} />
            <Route path="/admin-client-access" element={<AdminClientAccess />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

