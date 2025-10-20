
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";



export default function BuyerCard({ _id, title, price, quantity, pdfUrl, previewUrl }) {

  const { cartadd } = useCart()
  const [r, setr]=useState(1)

  const addcart = () => {
    cartadd({ _id, title, price, quantity:r });
  }

  const buypay = async () => {
    try {
      const res = await fetch("http://localhost:4000/carttype/pay", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items:[
            {
              title,
              price,
              quantity:r
            }
          ]
        })
      });

      const data=await res.json();
      window.location.href= data.url ;

    } catch (error) {
      console.error("error in payment")
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {previewUrl && (
          <img
            src={previewUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-md border"
          />
        )}

        <p className="text-gray-600">Price: ${price}</p>

        <div className="flex justify-between">
          <Button asChild variant="outline">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </Button>
           <div className="flex items-center gap-2 mt-1">
                    <Button variant="outline" size="sm" 
                      onClick={() => {
                  if (r >= 1) {
                    setr(r - 1);
                  }
                  else{
                    setr(0)
                  }
                }}
                      >-</Button>
                    <span>{r}</span>
                    <Button variant="outline" size="sm" 
                    onClick={  () => {
                    setr(r+ 1);
                     }}
                      >+</Button>
                  </div>
          <Button variant="default" onClick={buypay}>Buy</Button>
          <Button variant="outline" onClick={addcart}> <ShoppingCartIcon /></Button>
        </div>
      </CardContent>
    </Card>
  );
}
