const express= require(`express`)
const router = express.Router()

const auth=require(`../middlewares/auth`)
const { getcart, deletecart, addcart } = require("../controllers/cartcontrollers")

router.get(`/get`,auth, getcart)
router.post(`/add`,auth, addcart)
router.delete(`/remove`,auth, deletecart)

module.exports=router