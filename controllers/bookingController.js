const Booking = require("../models/Booking");
const Helper = require("../models/Helper");
const nodemailer = require("nodemailer");

// Tạo đặt lịch mới
exports.createBooking = async (req, res) => {
  const { userName, userPhone, userEmail, date, time, helperId } = req.body;

  try {
    const newBooking = await Booking.create({
      userName,
      userPhone,
      userEmail,
      date,
      time,
      helperId,
    });

    const helper = await Helper.findById(helperId);
    if (!helper) {
      return res.status(404).json({ message: "Không tìm thấy người giúp việc" });
    }

    // Gửi email xác nhận
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anhhoanhs90@gmail.com",          // ✔ Gmail thật
        pass: "fuhwmavadckglcvh"                // ✔ App password 16 ký tự
      },
    });

    const mailOptions = {
      from: "anhhoanhs90@gmail.com",
      to: userEmail,
      subject: "Xác nhận đặt lịch giúp việc",
      html: `
        <h3>Xin chào ${userName},</h3>
        <p>Bạn đã đặt lịch thành công với người giúp việc <strong>${helper.name}</strong>.</p>
        <p><strong>Thời gian:</strong> ${date} lúc ${time}</p>
        <p><strong>Điện thoại liên hệ:</strong> ${helper.phone}</p>
        <br/>
        <em>Trân trọng,<br/>FireFly App</em>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newBooking);
  } catch (err) {
    console.error("❌ Lỗi gửi email:", err.message);
    res.status(500).json({ message: "Lỗi khi đặt lịch", error: err.message });
  }
};

// Lấy danh sách đặt lịch
exports.getBookings = async (req, res) => {
  try {
    const filter = {};

    // Nếu có query email thì lọc theo email
    if (req.query.email) {
      filter.userEmail = req.query.email;
    }

    const bookings = await Booking.find(filter).populate("helperId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

