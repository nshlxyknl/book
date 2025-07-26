const express= require(`express`)
const router = express.Router()
const { uploadpdf,
        delpdf,
        getallpdf,
        getuserpdf
 }=require(`../controllers/bookcontrollers`)
const auth=require(`../middlewares/auth`)
const checkRole = require("../middlewares/roleCheck")

router.post(`/upload`,auth, checkRole("seller"), uploadpdf)
router.delete(`/del`,auth,checkRole("seller"), delpdf)
router.get(`/all`,auth, checkRole("admin"), getallpdf)
router.get(`/user`,auth,getuserpdf)

module.exports=router
