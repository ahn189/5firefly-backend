const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 📌 Middleware xác thực JWT
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Thiếu token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
}

// 📝 1. Tạo booking mới
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Đặt lịch thành công", booking });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// 📋 2. Lấy toàn bộ booking (admin hoặc để debug)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("helperId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// 👤 3. Lấy lịch cá nhân qua token
router.get("/my", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const bookings = await Booking.find({ userEmail: user.email }).populate("helperId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
