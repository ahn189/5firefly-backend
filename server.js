const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Đã kết nối MongoDB Atlas'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Import các routes
const authRoutes = require('./routes/authRoutes'); 
app.use('/api/auth', authRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('✅ Backend is running...');
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server đang chạy tại cổng ${PORT}`));

const helperRoutes = require('./routes/helper');
app.use('/api/helpers', helperRoutes);

// Cho phép truy cập file ảnh tĩnh
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const bookingRoutes = require("./routes/booking");
app.use("/api/bookings", bookingRoutes);
