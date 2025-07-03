import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, List, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import './Chat.css';

const { Title } = Typography;

function Chat() {
  const [messages, setMessages] = useState([
    { user: '系统', text: '欢迎进入聊天室！' }
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  // 滚动到底部
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // 预留后端对接
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: '我', text: input }]);
    setInput('');
    // TODO: 发送到后端
  };

  return (
    <div className="chat-bg">
      <Card style={{ maxWidth: 600, margin: '40px auto', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}><MessageOutlined /> 聊天室</Title>
        <div ref={listRef} style={{ height: 300, overflowY: 'auto', background: '#f7f7f7', borderRadius: 8, padding: 12, marginBottom: 16 }}>
          <List
            dataSource={messages}
            renderItem={item => (
              <List.Item>
                <b>{item.user}：</b>{item.text}
              </List.Item>
            )}
          />
        </div>
        <Input.Group compact>
          <Input
            style={{ width: '80%' }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={sendMessage}
            placeholder="输入消息..."
          />
          <Button type="primary" onClick={sendMessage}>发送</Button>
        </Input.Group>
      </Card>
    </div>
  );
}

export default Chat;
