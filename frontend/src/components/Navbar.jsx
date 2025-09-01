import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
const token =localStorage.getItem("token")

 const handlelogout= () => {
localStorage.removeItem("token")
localStorage.removeItem("role")
 }

  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <Link to="/home" className="text-xl font-bold text-blue-600">
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
          <Link to="/login" onClick={handlelogout} className="hover:text-blue-600">Logout</Link>
          <Link to="/profile" className="hover:text-blue-600">Profile</Link>
        </nav>
        )}
        </div>
        </header>
  )
}
