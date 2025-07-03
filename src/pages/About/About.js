import React from 'react';
import { Card, Typography, Avatar, Row, Col } from 'antd';
import { InfoCircleOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import './About.css';

const { Title, Paragraph, Link } = Typography;

function About() {
  return (
    <div className="about-bg about-full">
      <Card
        className="about-card about-card-large"
        bodyStyle={{ padding: 48, minHeight: 420 }}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 'calc(100vh - 64px - 16px)',
          margin: '8px',
          borderRadius: 24,
          boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Row gutter={32} align="middle" style={{ width: '100%' }}>
          <Col xs={24} sm={8} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Avatar
              size={120}
              src="https://api.dicebear.com/7.x/pixel-art/svg?seed=author&backgroundColor=transparent"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)', border: '2px solid #e6f7ff', background: '#fff' }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={3} style={{ marginBottom: 12 }}><InfoCircleOutlined /> 关于作者</Title>
            <Paragraph style={{ fontSize: 18, marginBottom: 16 }}>
              本站作者：小廖<br />
              首先感谢您能在百忙中光临我的网站。下面是作者个人介绍。
              前端/全栈开发爱好者，热衷于城市生活服务产品设计与实现。<br />
              喜欢用代码和设计让生活更美好。
              作者是湖南科技职业学院的大三学生，现正在找实习。此网站是作者独立完成的一个简单小网站。
            </Paragraph>
            <Paragraph style={{ fontSize: 16 }}>
              <MailOutlined /> 邮箱：<Link href="mailto:author@example.com">author@example.com</Link><br />
              <GithubOutlined /> GitHub：<Link href="https://github.com/author" target="_blank">author</Link>
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default About;
