const multer = require("multer");


    var storage = multer.diskStorage(
         {
            destination: function (req, file, cb) {
                console.log("inside image destination ");
                cb(null, './public/uploads')
            },
            filename: function (req, file, cb) {
                cb(null, 'vendor' + file.originalname)
            }
        }
    );
    const filefilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            return cb(null, true)
        }
        else {   
            return (null, false)
        }
    }
    const upload = multer(
        {
            storage: storage,
            filefilter: filefilter

        }
    );
function uploadImg(req,res,next){
    console.log("inside image upload");
    if(req.file){
        upload.single('vendorDoc').then((up)=>{res.send(console.log("uploaded sucessfully"))})
        .catch((err)=>{res.send(err)});
         const pathName=req.file.path;
        res.send(req.file,pathName);
        console.log("image uploaded sucessfully")
    }
    next();
}
module.exports = { uploadImg}  