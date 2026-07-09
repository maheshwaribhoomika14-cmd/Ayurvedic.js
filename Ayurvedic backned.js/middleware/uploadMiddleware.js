const multer = require('multer');
const path = require('path');

// 🚀 Storage configuration: Files ko aapke 'uploads' folder mein unique naam se save karne ke liye
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Kyunki aapke root par 'uploads' folder pehle se bana hua hai
  },
  filename: (req, file, cb) => {
    // Unique timestamp lagakar file name format banayega
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

// 📸 File filter: Sirf authentic images allow karne ke liye
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Max 10MB data handle limit
});

module.exports = upload;