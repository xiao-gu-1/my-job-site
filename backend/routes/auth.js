// backend/routes/auth.js
//登录 注册
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const User = require('../models/User');
const db = require('../db');

const router = express.Router();//创建一个路由实例

// 注册
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: '数据库错误' });
      if (results.length > 0) {
        return res.status(400).json({ message: '用户名或邮箱已存在' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: '注册失败' });

          const token = jwt.sign(
            { userId: result.insertId },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
          );

          res.status(201).json({
            message: '注册成功',
            token,
            user: {
              id: result.insertId,
              username,
              email
            }
          });
        }
      );
    }
  );
});

// 登录
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: '数据库错误' });
      if (results.length === 0) {
        return res.status(400).json({ message: '用户不存在' });
      }

      const user = results[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: '密码错误' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: '登录成功',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }
  );
});
// 注销账户（删除用户）
router.post('/delete', (req, res) => {
  const { userId } = req.body;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ message: '注销失败' });
    res.json({ message: '账户已注销' });
  });
});
// 修改密码
router.post('/change-password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  db.query('SELECT * FROM users WHERE id = ?', [userId], async (err, results) => {
    if (err) return res.status(500).json({ message: '数据库错误' });
    if (results.length === 0) return res.status(400).json({ message: '用户不存在' });
    const user = results[0];
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) return res.status(400).json({ message: '原密码错误' });
    const hashed = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], (err2) => {
      if (err2) return res.status(500).json({ message: '修改失败' });
      res.json({ message: '密码修改成功' });
    });
  });
});

module.exports = router;


/*  废弃代码（原用mongoDB数据库写，现废弃，改用MySQL）
// 用户注册
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: '用户名或邮箱已存在' 
      });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '用户不存在' });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
*/