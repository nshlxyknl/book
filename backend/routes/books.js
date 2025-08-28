const express= require(`express`)
const router = express.Router()
const { uploadpdf,
        delpdf,
        getallpdf,
        getuserpdf,
        updateTaskStatus
 }=require(`../controllers/bookcontrollers`)
const auth=require(`../middlewares/auth`)
const checkRole = require("../middlewares/roleCheck")

router.post(`/upload`,auth, checkRole("seller"), uploadpdf)
router.delete(`/del/:id`,auth,checkRole("admin"), delpdf)
router.get(`/all`,auth, checkRole("admin"), getallpdf)
router.get(`/user`,auth,getuserpdf)
router.put(`/:id`,auth,updateTaskStatus)


module.exports=router
