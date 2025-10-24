import React, { useState } from 'react'

export const ManageUsers = () => {
  const [user,setUser]= useState("")

  const handleusers =async()=>{
    const res = await fetch("http://localhost:4000/tasktype/users",{
      method: "GET",
      headers:{"Authorization" : `Bearer ${localStorage.getItem("token")}`},
    })
    const data = res.json();
    setUser(data) 
  }

  
  return (
    
        <div className="p-4 w-80 bg-white shadow-lg">
          
              <div
                className="flex justify-between items-center border-b py-2">
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-sm text-gray-600">
                    {user.role}
                  </p>
                </div>
               
              </div>
              </div>
          
  )
}

