import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, Button, Carousel } from 'antd';
import './HomeBg.css'; // 新增样式文件

const features = [
  {
    title: '天气查询',
    desc: '实时天气预报，支持全国城市。',
    link: '/weather'
  },
  {
    title: '新闻浏览',
    desc: '多类型新闻资讯，随时了解身边大事。',
    link: '/news'
  },
  {
    title: '聊天室',
    desc: '与同城/同好实时在线交流。',
    link: '/chat'
  },
  {
    title: '关于作者',
    desc: '了解本站作者和联系方式。',
    link: '/about'
  }
];

// 轮播图广告数据
const carouselData = [
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    title: '城市生活新体验',
    desc: '发现你身边的精彩，享受智慧城市服务。'
  },
  {
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    title: '实时天气预报',
    desc: '随时随地掌握天气变化，出行无忧。'
  },
  {
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    title: '同城聊天室',
    desc: '结识新朋友，畅聊城市生活点滴。'
  }
];

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    //fetchWeather(city);
    // eslint-disable-next-line
  }, []);
 
  if (!user) return null; //确保只有登录用户才能看到页面内容

  return (
    <div className="home-bg">
      {/* 轮播图广告 */}
      <div style={{ maxWidth: 900, margin: '32px auto 16px auto' }}>
        <Carousel autoplay effect="fade" dots>
          {carouselData.map((item, idx) => (
            <div key={idx}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: 320,
                background: `url(${item.img}) center/cover no-repeat`,
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  padding: '24px 32px',
                  borderRadius: '0 0 12px 12px'
                }}>
                  <h2 style={{ margin: 0 }}>{item.title}</h2>
                  <p style={{ margin: '8px 0 0 0', fontSize: 18 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <h1 style={{ textAlign: 'center', margin: '32px 0' }}>城市生活社交门户</h1>
      <Row gutter={24} justify="center">
        {features.map(f => (
          <Col xs={24} sm={12} md={6} key={f.title}>
            <Card
              title={f.title}
              bordered={false}
              style={{ marginBottom: 24, minHeight: 200 }}
              actions={[
                <Button type="primary" onClick={() => navigate(f.link)}>进入</Button>
              ]}
            >
              <p>{f.desc}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
////////////////////////////////////////////////////////////
/*function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [city, setCity] = useState('北京');
    const [weather, setWeather] = useState(null);
    const [future, setFuture] = useState([]);
    const [msg, setMsg] = useState('');
  
    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
      fetchWeather(city);
      // eslint-disable-next-line
    }, []);
  
    // 查询天气（请求自己的后端）
    const fetchWeather = async (cityName) => {
      setMsg('');
      setWeather(null);
      setFuture([]);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/weather/simple?city=${encodeURIComponent(cityName)}`
        );
        if (res.data.error_code !== 0) {
          setMsg(res.data.reason || '查询失败');
          return;
        }
        setWeather(res.data.result.realtime);
        setFuture(res.data.result.future);
      } catch (err) {
        setMsg('查询失败');
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
      fetchWeather(city);
    };
  
    if (!user) return null; //确保只有登录用户才能看到页面内容
  
    return (
      <div style={{ maxWidth: 400, margin: '50px auto' }}>
        <h2>欢迎，{user.username}！</h2>
        <p>邮箱：{user.email}</p>
        <button onClick={handleLogout}>退出登录</button>
        <hr />
        <form onSubmit={handleSearch}>
          <input
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="输入城市名"
          />
          <button type="submit">查询天气</button>
        </form>
        {msg && <p style={{ color: 'red' }}>{msg}</p>}
        {weather && (
          <div>
            <h3>当前实时天气</h3>
            <p>温度：{weather.temperature}℃</p>
            <p>湿度：{weather.humidity}%</p>
            <p>天气：{weather.info}</p>
            <p>风向：{weather.direct}</p>
            <p>风力：{weather.power}</p>
            <p>空气质量：{weather.aqi}</p>
          </div>
        )}
        {future.length > 0 && (
          <div>
            <h3>未来天气预报</h3>
            {future.map((item, idx) => (
              <div key={idx} style={{borderBottom: '1px solid #eee', marginBottom: 8}}>
                <p>日期：{item.date}</p>
                <p>温度：{item.temperature}</p>
                <p>天气：{item.weather}</p>
                <p>风向：{item.direct}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

export default Home;*/