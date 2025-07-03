const express = require('express');
const axios = require('axios');
const router = express.Router();

const JUHE_KEY = '8be7b335aeff042d26ba7a7d2d60dd1c';
//const apiUrl = 'http://apis.juhe.cn/simpleWeather/query';
// 天气查询转发接口
router.get('/simple', async (req, res) => {
  const city  = req.query.city;
  if(!city){
    return res.json({ error_code: 1, reason: '城市名不能为空' });
  }
  try {
    // 向聚合API转发请求
    const juheRes = await axios.get('http://apis.juhe.cn/simpleWeather/query', {
      params: {
        city,
        key: JUHE_KEY
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // 直接转发聚合返回的数据
    res.json(juheRes.data);
  } catch (err) {
    res.json({ error_code: 2, reason: '天气API请求失败', detail: err.message });
  }
});

module.exports = router;