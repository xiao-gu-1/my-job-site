// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
const newsRoutes = require('./routes/news');
require('./db'); // 确保数据库连接

const app = express();
app.use(cors());
app.use(express.json());

// 使用路由
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

// 测试接口
app.get('/api/hello', (req, res) => {//req:请求，res:响应
  res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});