import {BrowserRouter as Router, Routes ,Route, Navigate} from "react-router-dom"
// import { HomePage } from "./pages/HomePage"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import Navbar from "./components/Navbar"
// import { Footer } from "./components/Footer"



function App() {
 return(<>
<Router>
    <Navbar/>
<Routes>
  {/* <Route path='/' element={<Navigate to ='/home' replace/>} ></Route> */}
  {/* <Route path='/home' element={<HomePage/>} ></Route> */}
  <Route path='/register' element={<Register/>} ></Route>
  <Route path='/login' element={<Login/>} ></Route>
</Routes>
 {/* <Footer/> */}
</Router>
 </>)
}

export default App
