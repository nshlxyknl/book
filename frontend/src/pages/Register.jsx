import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const Register = () => {

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const {login} = useAuth();

  const handlereg= async (e) => {
  e.preventDefault();

try{
const res= await fetch("http://localhost:4000/logtype/register",{
  method: "POST",
  headers: { "Content-Type":"application/json"},
  body: JSON.stringify({ username, password }),
 })

 const data= await res.json();

 if(res.ok){
  login(data.token,data.user.token)
  alert("reg successful");
  navigate(`/login`);
 }else {
        alert(data.message || "Reg failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong");
    }

  }


  return (<>
        <div className='flex justify-center items-center min-h-screen px-4'>
                   <Card className={'w-full max-w-md p-6'}>
                       <CardContent >
                           <h2 className='text-center text-2xl font-semibold mb-4'> Register</h2>
                           <form  onSubmit={handlereg} className="space-y-4">
                               <Input type='text' placeholder= 'username' value={username} onChange={(e) => setUsername(e.target.value)} className={'p-4'}/>
                               <Input type='password' placeholder= 'password' value={password} onChange={(e) => setPassword(e.target.value)} className={'p-4'}/>
                              <div className="flex justify-center">
                               <Button type='submit' className="w-full sm:w-auto"> Register </Button>
                               </div>
                  <h3 className='text-center'> Already have an account? {""}
                    <Link to ="/Login" className="text-blue-600 hover:underline">
                    Login
                    </Link>
                  </h3>
                                </form>
       </CardContent>
                   </Card>
               </div>
               </>
          
  )
}
