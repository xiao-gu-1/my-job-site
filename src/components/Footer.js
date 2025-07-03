import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import { 
  GithubOutlined, 
  MailOutlined, 
  PhoneOutlined,
  HeartOutlined 
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter 
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 24px 20px',
        marginTop: 'auto'
      }}
    >
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>
              关于我们
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>
              致力于为用户提供优质的新闻资讯、天气查询和社交聊天服务
            </p>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>
              快速链接
            </h3>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
              <div style={{ marginBottom: 8 }}>首页</div>
              <div style={{ marginBottom: 8 }}>新闻浏览</div>
              <div style={{ marginBottom: 8 }}>天气查询</div>
              <div style={{ marginBottom: 8 }}>聊天室</div>
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>
              联系我们
            </h3>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MailOutlined style={{ marginRight: 8 }} />
                3197561038@qq.com
              </div>
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhoneOutlined style={{ marginRight: 8 }} />
                +86 155-2649-9239
              </div>
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'white', marginBottom: 16 }}>
              关注我们
            </h3>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GithubOutlined style={{ marginRight: 8, fontSize: 16 }} />
                Gi....
              </div>
            </div>
          </div>
        </Col>
      </Row>
      
      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '24px 0 16px' }} />
      
      <div style={{ 
        textAlign: 'center', 
        color: 'rgba(255,255,255,0.8)', 
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
      }}>
        <span>© {currentYear} 小聊网. All rights reserved.</span>
        <HeartOutlined style={{ color: '#ff4d4f' }} />
        <span>Made with love</span>
      </div>
    </AntFooter>
  );
};

export default Footer; 