import React from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (<>
        <div className='flex justify-center items-center min-h-screen px-4'>
                   <Card className={'w-full max-w-md p-6'}>
                       <CardContent >
                           <h2 className='text-center text-2xl font-semibold mb-4'> Register</h2>
                           <form className="space-y-4">
                               <Input type='text' placeholder= 'username' className={'p-4'}/>
                               <Input type='password' placeholder= 'password' className={'p-4'}/>
                              <div className="flex justify-center">
                               <Button className="w-full sm:w-auto"> Register </Button>
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
