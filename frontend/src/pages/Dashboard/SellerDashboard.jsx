import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ShoppingCart, DollarSign, Package } from "lucide-react"
import { useEffect, useState } from "react"

export default function SellerDashboard() {
  const [open,setOpen]=useState(false);
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [pdfUrl,setUrl]=useState("");
  

  const handleadd= async (e)=>{
    e.preventDefault();
    
    try {
       const res= await fetch("http://localhost:4000/tasktype/upload",{
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ title , price, pdfUrl})
       })

      const data= await res.json();
       console.log(data);

       if(res.ok){
        alert("upload success");
        setOpen(false)
       }else{
        alert("upload failed")
       }

    } catch (error) {
      console.log('not submitted')
    }
  }

  useEffect(() => {
    if (!open) {
      setOpen(true); 
    }
  }, []);

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

      <div className="flex mx-4 ">
       <Popover open={open} onOpenChange={setOpen} >
         <PopoverTrigger asChild>
          <Button onClick={() => setOpen(!open)}>Add PDF</Button>
        </PopoverTrigger>
        <form onSubmit={handleadd}>
        <PopoverContent  className="flex flex-col gap-3 p-4 w-64 ml-10 ">
          <Input type="text" placeholder="xyz" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 rounded-md "/>
          <Input type="number" placeholder="$$" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 rounded-md "/>
          <Input type="file" placeholder=".pdf" value={pdfUrl} onChange={(e) => setUrl(e.target.value)} className="p-2 rounded-md "/>
         
          <div className="flex justify-end gap-2 mt-2">
          <Button onClick={()=> setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={() => {setOpen(false);}}>Add</Button>
          </div>
        </PopoverContent>
        </form>
      </Popover>
      </div>
    </div>
  )
}
