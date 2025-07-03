import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Spin, Menu, Layout,Image } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './News.css';

const { Title } = Typography;
const { Sider, Content } = Layout;

const newsTypes = [
  { key: 'military', label: '军事网' },
  { key: 'env', label: '环保资讯' },
  { key: 'movie', label: '影视资讯' },
  { key: 'brief', label: '每日简报' },
  { key: 'it', label: '互联网资讯' },
];

function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('military');

  useEffect(() => {
    setLoading(true);
    if (selectedType === 'military') {//军事新闻
      axios.get('http://localhost:5000/api/news/military')
        .then(res => {
          if (res.data.code === 200) {
            setNewsList(res.data.result.newslist);
          } else {
            setNewsList([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setNewsList([]);
          setLoading(false);
        });
    } else if (selectedType === 'env') {//环保资讯
      axios.get('http://localhost:5000/api/news/env')
        .then(res => {
          if (res.data.code === 200) {
            setNewsList(res.data.result.newslist);
          } else {
            setNewsList([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setNewsList([]);
          setLoading(false);
        });
    } else if (selectedType === 'movie') {//影视资讯
      axios.get('http://localhost:5000/api/news/movie')
        .then(res => {
          if (res.data.code === 200) {
            setNewsList(res.data.result.newslist);
          } else {
            setNewsList([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setNewsList([]);
          setLoading(false);
        });
    } else if (selectedType === 'brief') {//每日简报
      axios.get('http://localhost:5000/api/news/brief')
        .then(res => {
          if (res.data.code === 200) {
            setNewsList(res.data.result.list);
          } else {
            setNewsList([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setNewsList([]);
          setLoading(false);
        });
    } else if (selectedType === 'it') {//互联网资讯
      axios.get('http://localhost:5000/api/news/it')
        .then(res => {
          if (res.data.code === 200) {
            setNewsList(res.data.result.newslist);
          } else {
            setNewsList([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setNewsList([]);
          setLoading(false);
        });
    } else {
      // 其它类型API...
      setNewsList([]);
      setLoading(false);
    }
  }, [selectedType]);


  return (
    <Layout className="news-layout">
      <Sider width={200} className="news-sider">
        <Menu
          mode="inline"
          selectedKeys={[selectedType]}
          style={{ borderRadius: 8, marginTop: 48 }}
          items={newsTypes.map(type => ({
            key: type.key,
            label: type.label
          }))}
          onClick={({ key }) => setSelectedType(key)}
        />
      </Sider>
      <Content className="news-content">
        <Card className="news-card">
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}><ReadOutlined /> 新闻浏览</Title>
          {loading ? <Spin style={{ display: 'block', margin: '40px auto' }} /> : (
            <List
            itemLayout="vertical"
            dataSource={newsList}
            renderItem={item => (
              selectedType === 'brief' ? (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    title={item.title}
                    description={item.mtime}
                  />
                  <div style={{ color: '#666', fontSize: 14 }}>{item.digest}</div>
                </List.Item>
              ) : (
                <List.Item
                  key={item.id}
                  extra={
                    item.picUrl && (
                      <Image
                        width={120}
                        src={item.picUrl.startsWith('http') ? item.picUrl : 'https:' + item.picUrl}
                        alt={item.title}
                        style={{ borderRadius: 8 }}
                        preview={false}
                      />
                    )
                  }
                >
                  <List.Item.Meta
                    title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                    description={`${item.ctime} | ${item.source}`}
                  />
                  {item.description && <div style={{ color: '#666', fontSize: 14 }}>{item.description}</div>}
                </List.Item>
              )
            )}
          />
          )}
        </Card>
      </Content>
    </Layout>
  );
}

export default News;