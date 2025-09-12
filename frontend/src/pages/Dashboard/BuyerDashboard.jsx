import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react"

export default function BuyerDashboard({title, price , pdfUrl}) {
  return (
    <div className="min-h-screen my-10 bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold"> Buyer Dashboard</h1>
        <p className="text-muted-foreground">Want some books?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

         <Card className="shadow-md hover:shadow-lg transition duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <p className="text-gray-600">Price: ${price}</p>

        <div className="flex justify-between">
          {/* For free viewing */}
          <Button
            asChild
            variant="outline"
          >
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </Button>

          {/* For paid option */}
          <Button variant="default">Buy</Button>
        </div>
      </CardContent>
    </Card>
        

      </div>

    </div>
  )
}
