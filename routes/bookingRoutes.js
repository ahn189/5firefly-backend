const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getMyBookings
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

// ✅ Tạo đặt lịch (ai cũng dùng được)
router.post("/", createBooking);

// ✅ Xem tất cả đặt lịch (admin dùng)
router.get("/", getBookings);

// ✅ Xem lịch cá nhân (cần login)
router.get("/my", authMiddleware, getMyBookings);

module.exports = router;
