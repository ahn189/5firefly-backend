const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllHelpers,
  createHelper,
  updateHelper,
  deleteHelper,
  uploadImage,
  matchHelpers  // ✅ Thêm dòng này
} = require('../controllers/helperController');

// Cấu hình multer để upload ảnh vào folder 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// API CRUD
router.get('/', getAllHelpers);
router.post('/', createHelper);
router.put('/:id', updateHelper);
router.delete('/:id', deleteHelper);

// API upload ảnh
router.post('/:id/upload', upload.single('image'), uploadImage);

// ✅ API Matching helper theo địa chỉ và giới tính
router.get('/match', matchHelpers);

module.exports = router;
