const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, './public/images');
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype  === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif"){
        cb(null, true)
    }else{
    cb(null, false)    
    }
}

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024*1024*10
    },

    fileFilter: fileFilter
});

module.exports = {
    upload: upload
}