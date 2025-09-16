
//add button >buyerid >productid >db store >

exports.getcart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.items : []);

  } catch (error) {
    res.status(500).json({
      message: "Could not get any",
      details: error.message,
    })
  }
}



exports.addcart = async (req, res) => {
    try {
        const {userId, productId, price ,title}=req.body;
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
}}



exports.deletecart = async (req, res) => {
try {
     let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json([]);

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart.items);

} catch (error) {
     res.status(500).json({
      message: "Could not add to cart",
      details: error.message,
          })
}}



