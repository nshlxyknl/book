const Cart = require("../models/Cart")
const Book = require("../models/Book")
//add button >buyerid >productid >db store >
require("dotenv").config();




exports.addcart = async (req, res) => {
    try {

        const userId = req.user.userId;
        const { productId, price, title } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "ProductId is required" });
        }

        const product = await Book.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // check if item exists
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ productId, title, price, quantity: 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: "Could not add to cart",
            details: error.message,
        })
    }
}

exports.deletecart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.userId });
        const { productId } = req.params;

        if (!cart)
            return res.status(404).json({ message: "Cart not found" });

        // console.log("Deleting product:", productId);
        // console.log("Before:", cart.items.map(i => i.productId.toString()));

        //     cart.items = cart.items.filter(
        //   (item) => item.productId.toString() !== productId
        // );

        // console.log("After:", cart.items.map(i => i.productId.toString()));

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity -= 1;
        } else {
            cart.items.filter(
                (item) => item.productId.toString() !== productId
            );
        }

        await cart.save();
        return res.json(cart.items);

    } catch (error) {
        res.status(500).json({
            message: "Could not add to cart",
            details: error.message,
        })
    }
}

exports.getcart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });

        res.json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({
            message: "Could not get any",
            details: error.message,
        })
    }
}

const stripe= require("stripe")(process.env.SECRET_KEY)

exports.clearcart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = [];
        await cart.save();

        res.json({ message: "Cart cleared successfully", cart });

    } catch (error) {
        res.status(500).json({
            message: "Could not clear",
            details: error.message,
        })
    }
}

exports.pay = async (req, res) => {
   try {
     const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.items.map(item => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name: item.title,
    },
    unit_amount: item.price * 100, // Stripe uses cents
  },
  quantity: item.quantity,
})),
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ url: session.url });

   } catch (error) {
    res.status(500).json({
            message: "Could not pay",
            details: error.message,
            })
   }

}

