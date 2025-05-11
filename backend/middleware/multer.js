import multer from "multer";
import path from "path";

// Storage configuration
const storage=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

// Multer upload setup
const upload = multer({storage});

export default upload;
