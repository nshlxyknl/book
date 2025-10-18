import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet';
import { useContext, useEffect, useState } from 'react';
import { SheetCard } from '@/pages/UserPages/SheetCard';
import { usepay } from '@/context/PayContext';



export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate()


  const handlelogout = () => {
    logout();
    navigate("/login", { replace: true })
  }

   const [openSheet, setOpenSheet] = useState(false)
  const {cart,fetchUploads,addhandle,delhandle,clearcart,handlepay} =usepay();

  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          Readme
        </Link>

        {!token ? (
          <nav className="hidden md:flex space-x-6">
            <Link to="/register" className="hover:text-blue-600">Register</Link>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </nav>
        )
          : (
            <nav className="hidden md:flex space-x-6">
              {
                (role == 'buyer') ? (
                  <div>
                    <Sheet open={openSheet} onOpenChange={(open) => {
                      setOpenSheet(open)
                      if (open) {
                        fetchUploads();
                      }
                    }}>
                      <SheetTrigger asChild>
                        <Button variant="outline" > <ShoppingCartIcon /> </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <div>
                          <h2 className="font-bold text-lg mb-2">Your Cart</h2>
                          {cart?.length > 0 ?
                            (cart
                              .filter(item => item && item.title && item.quantity > 0)
                              .map((cart) => (
                                <>
                                  <SheetCard
                                    key={cart.productId}
                                    productId={cart.productId}
                                    title={cart.title}
                                    price={cart.price}
                                    quantity={cart.quantity}
                                    onDelete={delhandle}
                                    onAdd={addhandle}
                                  />
                                </>
                              ))) :
                            <div> empty </div>
                          }
                        </div>
                        <SheetFooter>
                          <div className="flex justify-between gap-2 mt-2">
                            <Button variant="destructive" onClick={clearcart} > Clear Cart</Button>
                            <Button variant="default" onClick={handlepay}> Checkout</Button>
                            <Button variant="outline" onClick={() => { setOpenSheet(false) }}>Continue Shopping</Button>
                          </div>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>
                )
                  : ""
              }
              <Button variant="destructive" onClick={handlelogout} > Logout
              </Button>
            </nav>
          )}
      </div>
    </header>
  )
}
