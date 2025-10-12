const express= require(`express`)
const router = express.Router()

const auth=require(`../middlewares/auth`)
const { getcart, deletecart, addcart, clearcart, payc } = require("../controllers/cartcontrollers")

router.get(`/get`,auth, getcart)
router.post(`/add`,auth, addcart)
router.delete(`/delete/:productId`,auth, deletecart)
router.delete(`/clearcart`,auth, clearcart)
router.post(`/pay`,auth, payc)

module.exports=router