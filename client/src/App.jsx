
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./pages/home"
import About from "./pages/about"
import SignIn from "./pages/signIn"
import SignUp from "./pages/signUp"
import ClientProfile from "./pages/clientProfile"
import CounselorProfile from "./pages/CounselorProfile"
import Registration from "./Pages/Registration"
import PrivateRoute from "./Components/PrivateRoute"


 
export default function App() {
 return  <BrowserRouter>
 {/* Header */}
 <Header/>

 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-up" element={<SignUp />} />
  <Route element={<PrivateRoute/>}>
  <Route path="/client-profile" element={<ClientProfile />} /></Route>
  <Route path="/counselor-profile" element={<CounselorProfile />} />
  <Route path="/registration" element={<Registration />} />

 </Routes>
    </BrowserRouter>
 
}



