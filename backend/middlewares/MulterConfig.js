const multer = require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null,'uploads/')
  }
},
{
  filesize: function (req,file, cb){
    cb(null,Date.now()+"-"+file.originalsize)
  }
})


const upload= multer({storage:storage})

// upload.single("pdfUrl"),(req,res)={
// console.log(req.file)
// console.log(req.body)
// res.json({
//   file:req.file,
//   data:req.body
// })
// }