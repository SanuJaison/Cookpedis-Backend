const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    
    
    callBack(null, "./uploads");
  },

  filename: (req, file, callBack) => {
   
    callBack(null, `image-${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, callBack) => {
     console.log(file);
  if (file.mimetype.startsWith("image/") || file.mimetype == 'application/octet-stream') {
    callBack(null, true);
    
  } else {
    callBack(null, false);
  }
};

const multerMiddleware = multer({ storage, fileFilter, });

module.exports = multerMiddleware;