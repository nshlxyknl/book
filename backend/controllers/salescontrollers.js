const Sale = require("../models/Sales");

exports.pending = async (req, res) => {
    try {
        const { items, buyerId } = req.body;
        console.log(items)

     
            const sales = items.map(item=>({
                buyerId,
                sellerId: item.sellerId,
                productId: item.productId,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                status: "pending",
            })
            )
            await Sale.insertMany(sales); 

        // res.status(201).json({
        //     message: "sales list"
        // });
    } catch (error) {
        res.status(500).json({
            items,
            message: "Could not make pending",
            details: error.message,
        });
    }
}

exports.updateSalesStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const sale = await Sale.findByIdAndUpdate(id, { status }, { new: true });
        res.json(sale);

    } catch (error) {
        res.status(500).json({
            message: "Could not update",
            details: error.message,
            
        });
    }
}

exports.getsales = async (req, res) => {
    try {
        const sales = await Sale.find({ sellerId: req.user.userId });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: "Could not get sales" });
    }
};

