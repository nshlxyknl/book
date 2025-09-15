import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'




export const SheetCard = ({ title, price }) => {
    return (
        <Card className="shadow-md hover:shadow-lg transition duration-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                <p className="text-gray-600">Price: ${price}</p>
            </CardContent>
        </Card>
    )
}
