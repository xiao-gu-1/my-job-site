import React, { useState } from 'react';
import { Card, Input, Button, Typography, message, Spin } from 'antd';
import { CloudOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Weather.css';

const { Title, Paragraph } = Typography;

function Weather() {
  const [city, setCity] = useState('长沙');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null); // 实时天气
  const [future, setFuture] = useState([]);     // 未来天气
  const [msg, setMsg] = useState('');
  const [cityName, setCityName] = useState(''); // 展示用城市名

  // 查询天气（请求后端转发的聚合API）
  const fetchWeather = async () => {
    setLoading(true);
    setMsg('');
    setWeather(null);
    setFuture([]);
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/simple?city=${encodeURIComponent(city)}`);
      if (res.data.error_code !== 0) {
        setMsg(res.data.reason || '查询失败');
        setLoading(false);
        return;
      }
      setWeather(res.data.result.realtime);
      setFuture(res.data.result.future);
      setCityName(res.data.result.city);
      setLoading(false);
    } catch (e) {
      setMsg('查询失败');
      setLoading(false);
    }
  };

  return (
    <div className="weather-bg">
      <Card style={{ maxWidth: 500, margin: '40px auto', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}><CloudOutlined /> 天气查询</Title>
        <Input.Search
          value={city}
          onChange={e => setCity(e.target.value)}
          onSearch={fetchWeather}
          enterButton="查询"
          size="large"
          placeholder="请输入城市名，如：长沙"
          style={{ marginBottom: 16 }}
        />
        {loading && <Spin style={{ display: 'block', margin: '20px auto' }} />}
        {msg && <Paragraph type="danger" style={{ color: 'red' }}>{msg}</Paragraph>}
        {/* 实时天气展示 */}
        {weather && (
          <div style={{ marginTop: 16 }}>
            <Paragraph>城市：{cityName}</Paragraph>
            <Paragraph>温度：{weather.temperature}℃</Paragraph>
            <Paragraph>天气：{weather.info}</Paragraph>
            <Paragraph>湿度：{weather.humidity}%</Paragraph>
            <Paragraph>风向：{weather.direct}</Paragraph>
            <Paragraph>风力：{weather.power}</Paragraph>
            <Paragraph>空气质量：{weather.aqi}</Paragraph>
          </div>
        )}
        {/* 未来天气展示 */}
        {future && future.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <Title level={5}>未来天气预报</Title>
            {future.map((item, idx) => (
              <Card key={idx} style={{ marginBottom: 8, background: '#f6faff' }}>
                <Paragraph>日期：{item.date}</Paragraph>
                <Paragraph>温度：{item.temperature}</Paragraph>
                <Paragraph>天气：{item.weather}</Paragraph>
                <Paragraph>风向：{item.direct}</Paragraph>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Weather;