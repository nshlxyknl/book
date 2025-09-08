import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react"
import { useState } from "react"

export default function SellerDashboard() {
  const [open,setOpen]=useState(false)


  return (
    <div className="min-h-screen my-10 bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold"> Seller Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your store</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
   
     <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
   
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
          </CardContent>
        </Card>


      </div>

      <div className="flex gap-4">
        <Button onClick={()=>{setOpen(!open)}}>Add PDF</Button>
       <Popover open={open} onOpenChange={setOpen}>
        <PopoverContent>
          <Input type="text" placeholder="xyz.pdf" />
          <Input type="number" placeholder="$$" />
        </PopoverContent>
      </Popover>
      </div>
    </div>
  )
}
