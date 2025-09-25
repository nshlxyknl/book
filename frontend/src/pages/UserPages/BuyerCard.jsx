
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";



export default function BuyerCard({ _id, title, price, pdfUrl, previewUrl }) {

  const {cartadd} =useCart()
  
  const addcart =  () => {
    cartadd({ _id, title, price });
    
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
          <Button variant="default">Buy</Button>
          <Button variant="outline" onClick={addcart}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}
