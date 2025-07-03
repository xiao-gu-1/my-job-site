import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './LoginRegister.css'; // 与登录页共用美化样式
import { UserContext } from './App';

const { Title } = Typography;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // 注册表单提交
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', values);
      message.success('注册成功，正在跳转首页...');
      // 注册成功后直接登录（保存token和user信息）
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        message.error('注册失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <Card className="login-card" bordered={false} hoverable>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>用户注册</Title>
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '邮箱格式不正确!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码至少6位' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ transition: 'all 0.3s' }}>
                注册
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span>已有账号？</span>
            <Button type="link" onClick={() => navigate('/login')}>去登录</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Register;