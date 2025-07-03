import './App.css';
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AppLayout from './components/AppLayout';
import Footer from './components/Footer';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  CloudOutlined,
  ReadOutlined,
  MessageOutlined,
  UserOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;

// 全局用户上下文
export const UserContext = createContext();

// 登录守卫组件，未登录自动跳转到登录页
function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// 顶部导航栏菜单项
const menuItems = [
  { label: <Link to="/">首页</Link>, key: '/' },
  { label: <Link to="/weather">天气查询</Link>, key: '/weather' },
  { label: <Link to="/news">新闻浏览</Link>, key: '/news' },
  { label: <Link to="/chat">聊天室</Link>, key: '/chat' },
  { label: <Link to="/about">关于作者</Link>, key: '/about' },
  { label: <Link to="/user">用户中心</Link>, key: '/user', style: { marginLeft: 'auto' } }
];
const menuStyle = { display: 'flex', justifyContent: 'space-between' };

function AppContent() {
  // 用useState管理全局用户状态
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const location = useLocation();
  const path = location.pathname;
  const selectedKey = menuItems
    .map(item => item.key)
    .find(key => key === path || (key !== '/' && path.startsWith(key))) || '/';

  // 监听localStorage变化（多标签页同步）
  useEffect(() => {
    const onStorage = () => {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout style={{ background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={menuItems}
              style={menuStyle}
            />
          </Header>
          <Content style={{ flex: 1, background: 'transparent', padding: 24 }}>
            <Routes>
              <Route path="/*" element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              } />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      )}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;