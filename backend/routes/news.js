const express = require('express');
const axios = require('axios');
const router = express.Router();

const TIANAPI_KEY = 'b0107ab85205a9d58838f586f022a908';

// 军事新闻接口
router.get('/military', async (req, res) => {
  try {
    const result = await axios.get('https://apis.tianapi.com/military/index', {
      params: {
        key: TIANAPI_KEY,
        num: 10
      }
    });
    res.json(result.data);
  } catch (err) {
    res.json({ code: 500, msg: '新闻API请求失败', detail: err.message });
  }
});

// 环保资讯接口
router.get('/env', async (req, res) => {
  try {
    const result = await axios.get('https://apis.tianapi.com/huanbao/index', {
      params: {
        key: TIANAPI_KEY,
        num: 10
      }
    });
    res.json(result.data);
  } catch (err) {
    res.json({ code: 500, msg: '新闻API请求失败', detail: err.message });
  }
});

// 影视资讯接口
router.get('/movie', async (req, res) => {
  try {
    const result = await axios.get('https://apis.tianapi.com/film/index', {
      params: {
        key: TIANAPI_KEY,
        num: 10
      }
    });
    res.json(result.data);
  } catch (err) {
    res.json({ code: 500, msg: '新闻API请求失败', detail: err.message });
  }
});

// 每日简报接口
router.get('/brief', async (req, res) => {
  try {
    const result = await axios.get('https://apis.tianapi.com/bulletin/index', {
      params: {
        key: TIANAPI_KEY
      }
    });
    res.json(result.data);
  } catch (err) {
    res.json({ code: 500, msg: '新闻API请求失败', detail: err.message });
  }
});

// 互联网资讯接口
router.get('/it', async (req, res) => {
  try {
    const result = await axios.get('https://apis.tianapi.com/internet/index', {
      params: {
        key: TIANAPI_KEY,
        num: 10
      }
    });
    res.json(result.data);
  } catch (err) {
    res.json({ code: 500, msg: '新闻API请求失败', detail: err.message });
  }
});

module.exports = router;