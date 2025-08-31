import React from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export const Login = () => {
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/logtype/login", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
         },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token || "");
        alert("Login successful!");
        navigate("/register"); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong");
    }
  };

    return (<>
        <div className='flex justify-center items-center min-h-screen px-4'>
            <Card className={'w-full max-w-md p-6'}>
                <CardContent >
                    <h2 className='text-center text-2xl font-semibold mb-4'> login</h2>
                    <form className="space-y-4">
                        <Input type='text' placeholder='username' className={'p-4'} />
                        <Input type='password' placeholder='password' className={'p-4'} />
                        <div className="flex justify-center">
                            <Button className="w-full sm:w-auto"> Login </Button>
                        </div>
                        <h3 className='text-center'> Don't have an account? {""}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </h3>
                    </form>
                </CardContent>
            </Card>
        </div>
        </>
    )
}
