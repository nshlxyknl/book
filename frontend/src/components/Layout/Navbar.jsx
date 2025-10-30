import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet';
import { useEffect, useState } from 'react';
import { SheetCard } from '@/pages/UserPages/SheetCard';



export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate()


  const handlelogout = () => {
    logout();
    navigate("/login", { replace: true })
  }


  const [openSheet, setOpenSheet] = useState(false)
  const [cart, setCart] = useState([])


  const fetchUploads = async () => {
    try {
      const res = await fetch("http://localhost:4000/carttype/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCart(data);
      console.log("cart data", data)
      return data;
    } catch (err) {
      console.error("Failed to fetch uploads", err);
    } 
  };
  useEffect(() => {
    if (openSheet) {
      fetchUploads();
    }
  }, [openSheet]);



  const addhandle = (addId) => {

    setCart((prev) =>
      prev.map((u) =>
        u.productId === addId
          ? { ...u, quantity: u.quantity }
          : u
      )
    );
  }

  const delhandle = (deletedId) => {

    setCart((prev) =>
      prev.map((u) =>
        u.productId === deletedId
          ? { ...u, quantity: u.quantity }
          : u
      )
    );
  }

  const clearcart = async () => {
    alert("clear cart")
    try {
      const res = await fetch("http://localhost:4000/carttype/clearcart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCart([])
        console.log("cart clear data", data)
      } else {
        alert("not ok res")
      }
    } catch (err) {
      console.error("clear bhayena la", err);
    }
  }

  const handlepay = async () => {
    try {
      if (!cart || !cart.length) {
        alert("Your cart is empty");
        return;
      }

      const res = await fetch("http://localhost:4000/carttype/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();
      window.location.href = data.url;

    } catch (error) {
      console.error("Stripe error:", error.message);
    }
  }

  const clearproduct=(deletedId)=>{
    setCart((prev) =>
      prev.map((u) =>
        u.productId === deletedId
          ? { ...u, quantity: 0 }
          : u
      )
    );
  }

  return (
    <header className="fixed top-0 left-0  z-50  w-full shadow-md bg-white dark:bg-gray-900">
      <div className=" max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

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
                        <Button variant="outline" > My Cart <ShoppingCartIcon /> </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <div>
                          <h2 className="font-bold text-lg mb-2">Your Cart</h2>
                          {cart?.length > 0 ?
                            (cart
                              .filter(item => item && item.title && item.quantity > 0)
                              // .filter(item => item._id)
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
                                    onClear={clearproduct}
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
