var multer = require('multer');
/*const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: "mongodb:localhost:27017/registergordata",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
*/
var storage = multer.diskStorage({
    destination:'./public/images', //directory (folder) setting
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname) // file name setting
    }
   
   
   
    
});
 
let upload = multer({
    storage: storage,
    fileFilter:(req, file, cb)=>{
     if(
         file.mimetype == 'image/jpeg' ||
         file.mimetype == 'image/jpg' ||
         file.mimetype == 'image/png' ||
         file.mimetype == 'image/gif'
 
     ){
         cb(null, true)
     }
     else{
         cb(null, false);
         cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
     }
    }
 })
//var upload = multer({ storage: storage });
module.exports=upload;