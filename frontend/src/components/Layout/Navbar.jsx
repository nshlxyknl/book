import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';

export default function Navbar() {
 const { token, logout } = useAuth();
 const navigate=useNavigate()

const handlelogout= () =>{
  logout();
  navigate("/login", {replace: true})
}


  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          Readme
        </Link>

{!token? (
        <nav className="hidden md:flex space-x-6">
          <Link to="/register" className="hover:text-blue-600">Register</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        </nav>
)
        :(
         <nav className="hidden md:flex space-x-6">
        <Button onClick={handlelogout} > Logout
        </Button> 
          <Link to="/profile" className="hover:text-blue-600">Profile</Link>
        </nav>
        )}
        </div>
        </header>
  )
}
