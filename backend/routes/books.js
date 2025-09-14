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
const { upload } = require("../config/cloudinary")

router.post(`/upload`,auth, checkRole("seller"), upload.single("pdf"), uploadpdf)
router.delete(`/del/:id`,auth, delpdf)
router.get(`/all`,auth, getallpdf)
router.get(`/user`,auth,getuserpdf)
router.put(`/:id`,auth,updateTaskStatus)


module.exports=router
