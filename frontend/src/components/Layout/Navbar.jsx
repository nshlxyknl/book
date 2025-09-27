import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet';
import { useEffect, useState } from 'react';
import { SheetCard } from '@/pages/UserPages/SheetCard';
import { useCart } from '@/context/CartContext';


export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate()

   const { cart } = useCart(); 

  const [openSheet, setOpenSheet] = useState(false)

  const handlelogout = () => {
    logout();
    navigate("/login", { replace: true })
  }

  //taneko buyercard ra dashboard bata  

   const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await fetch("http://localhost:4000/carttype/get",{
          method:"GET",
           headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
      });
        const data = await res.json();
        console.log("d",data)
        setUploads(data);
      } catch (err) {
        console.error("Failed to fetch uploads", err);
      }
    };

    fetchUploads();
  }, []);


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
                    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                      <SheetTrigger asChild>
                        <Button variant="outline" > <ShoppingCartIcon /> </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <div>
                           <h2 className="font-bold text-lg mb-2">Your Cart</h2>
                          { uploads?.length > 0 ?
                           (uploads
                            .filter(item => item && item.title && item.price)
                            .map((upload) => (
                              <>
                                  <SheetCard
                                    key={upload._id}
                                    productId={upload._id}
                                    title={upload.title}
                                    price={upload.price}
                                     onDelete={(deletedId) =>
          setUploads((prev) => prev.filter((u) => u._id !== deletedId))}
                                  />
                                
                                  </>
                                ))) :
                                <div> empty </div>
                                }
                        </div>
                        <SheetFooter>
                          <div className="flex justify-between gap-2 mt-2">
                            <Button variant="default"> Checkout</Button>
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
              <Button variant="outline">
                <Link to="/profile">Profile</Link>
              </Button>
            </nav>
          )}
      </div>
    </header>
  )
}
