import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import "./index.css";
import Navbar from "./components/Navbar";
import SignIn from './components/Signin';
import Register from './components/Register';

function App() {
return( <>
<Router>
<Navbar/>
<Routes>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/signin" element={<SignIn/>}/>
</Routes>
</Router>
</> )
}

export default App
