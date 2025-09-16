const express= require(`express`)
const router = express.Router()

const auth=require(`../middlewares/auth`)
const { getcart } = require("../controllers/cartcontrollers")

router.get(`/cart`,auth, getcart)
router.post(`/add`,auth, addcart)
router.delete(`/remove`,auth, removecart)

module.exports=router