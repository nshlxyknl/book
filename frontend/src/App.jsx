import {BrowserRouter as Router, Routes ,Route, Navigate} from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import Navbar from "./components/Navbar"
import { Footer } from "./components/Footer"
import Dashboard from "./components/dashboard/Dashboard"
import { ProtectedRoutes } from "./components/Routes/ProtectedRoutes"
import { PublicRoutes } from "./components/Routes/PublicRoutes"


function App() {
 return(<>
<Router>
    <Navbar/>
<Routes>
  <Route path='/' element={<Navigate to ='/home' replace/>} ></Route>
  <Route path='/home' element={<PublicRoutes> <HomePage/> </PublicRoutes>} ></Route>
  <Route path='/register' element={<PublicRoutes> <Register/> </PublicRoutes> } ></Route>
  <Route path='/login' element={<PublicRoutes> <Login/> </PublicRoutes> } ></Route>
  <Route path='/dashboard' element={<ProtectedRoutes> <Dashboard/> </ProtectedRoutes>}> </Route>
</Routes>
 <Footer/>
</Router>
 </>)
}

export default App
