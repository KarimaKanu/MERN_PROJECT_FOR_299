
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./assets/Pages/Home"
import About from "./assets/Pages/About"
import SignIn from "./assets/Pages/SignIn"
import SignUp from "./assets/Pages/SignUp"
import ClientProfile from "./assets/Pages/ClientProfile"
import Header from "./Components/Header"
import CounselorProfile from "./assets/Pages/CounselorProfile"

 
export default function App() {
 return  <BrowserRouter>
 {/* Header */}
 <Header/>

 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-up" element={<SignUp />} />
  <Route path="/client-profile" element={<ClientProfile />} />
  <Route path="/counselor-profile" element={<CounselorProfile />} />
 </Routes>
    </BrowserRouter>
 
}



