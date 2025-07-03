import React, { useState, useContext,useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginRegister.css'; // 新建一个css文件用于动画和美化
import { UserContext } from './App';
//import { message } from 'antd';
const { Title } = Typography;


function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    message.success('测试message能否显示');
  }, []);////////////////////////
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', values);
      message.success('登录成功，正在跳转...');
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
        message.error('登录失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <Card className="login-card" bordered={false} hoverable>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>用户登录</Title>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '邮箱格式不正确!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入邮箱" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ transition: 'all 0.3s' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span>还未注册？</span>
            <Button type="link" onClick={() => navigate('/register')}>去注册</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;