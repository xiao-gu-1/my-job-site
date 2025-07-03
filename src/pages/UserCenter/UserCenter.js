import React, { useState } from 'react';
import { Card, Typography, Button, Avatar, message, Modal, Form, Input, Popconfirm } from 'antd';
import { UserOutlined, LogoutOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import './UserCenter.css';

const { Title, Paragraph } = Typography;

function UserCenter() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [pwdModalOpen, setPwdModalOpen] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    message.success('已退出登录');
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  };

  const handleDelete = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/delete', { userId: user.id });
      message.success('账户已注销');
      handleLogout();
    } catch {
      message.error('注销失败');
    }
  };

  const handlePwdChange = async (values) => {
    setPwdLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/change-password', {
        userId: user.id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      });
      message.success('密码修改成功，请重新登录');
      setPwdModalOpen(false);
      handleLogout();
    } catch (e) {
      message.error(e.response?.data?.message || '修改失败');
    }
    setPwdLoading(false);
  };

  if (!user) return null;

  return (
    <div className="usercenter-bg">
        <Card
        style={{
          width: '100%',
          maxWidth: 700,
          minHeight: 420,
          margin: '24px auto',
          borderRadius: 24,
          boxShadow: '0 4px 32px rgba(0,0,0,0.10)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Title level={3} style={{ textAlign: 'center' }}><UserOutlined /> 用户中心</Title>
        <Paragraph style={{ marginTop: 16 }}>
          用户名：{user.username}<br />
          邮箱：{user.email}
        </Paragraph>
        <Button type="primary" icon={<EditOutlined />} block style={{ marginTop: 16 }} onClick={() => setPwdModalOpen(true)}>
          修改密码
        </Button>
        <Popconfirm
          title="确定要注销账户吗？此操作不可恢复！"
          onConfirm={handleDelete}
          okText="确定"
          cancelText="取消"
        >
          <Button type="primary" danger icon={<DeleteOutlined />} block style={{ marginTop: 16 }}>
            注销账户
          </Button>
        </Popconfirm>
        <Button type="default"  icon={<LogoutOutlined />} block onClick={handleLogout} style={{ marginTop: 24 }}>
          退出登录
        </Button>
      </Card>
      <Modal
        title="修改密码"
        open={pwdModalOpen}
        onCancel={() => setPwdModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handlePwdChange}>
          <Form.Item name="oldPassword" label="原密码" rules={[{ required: true, message: '请输入原密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }, { min: 6, message: '至少6位' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={pwdLoading} block>
              修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserCenter;