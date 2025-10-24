const express= require(`express`)
const router = express.Router()
const { uploadpdf,
        delpdf,
        getallpdf,
        getuserpdf,
        updateTaskStatus,
        getsales,
        getAllUsers,
        deluser

 }=require(`../controllers/bookcontrollers`)
const auth=require(`../middlewares/auth`)
const checkRole = require("../middlewares/roleCheck")
const { upload } = require("../config/cloudinary")

router.post(`/upload`,auth, checkRole("seller"), upload.single("pdf"), uploadpdf)
router.delete(`/del/:id`,auth, delpdf)
router.get(`/all`,auth, getallpdf)
router.get(`/sales`,auth, getsales)
router.get(`/user`,auth,getuserpdf)
// router.put(`/:id`,auth,updateTaskStatus)
router.get(`/users`,auth,getAllUsers)
router.delete(`/:id`,auth,deluser)


module.exports=router
