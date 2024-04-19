const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'GameWorld',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const uploadFile = multer({ storage });

module.exports = { uploadFile };
