import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, message } from 'antd';
import { saveData, loadData } from '../utils/storage';

interface CheckoutRecord {
  id: string;
  playerId: string;
  giftValue: number;
  actualAmount: number;
  date: string;
}

const Checkout: React.FC = () => {
  const [checkouts, setCheckouts] = useState<CheckoutRecord[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData('checkouts').then((data) => {
      if (data) {
        setCheckouts(data);
      }
    }).catch((error) => {
      console.error('Failed to load checkouts:', error);
      message.error('加载结账记录失败');
    });
  }, []);

  useEffect(() => {
    saveData('checkouts', checkouts).catch((error) => {
      console.error('Failed to save checkouts:', error);
      message.error('保存结账记录失败');
    });
  }, [checkouts]);

  const onFinish = (values: any) => {
    const newCheckout: CheckoutRecord = {
      id: Date.now().toString(),
      playerId: values.playerId,
      giftValue: values.giftValue,
      actualAmount: values.giftValue * 0.82, // 假设折扣率为 0.82
      date: new Date().toLocaleString(),
    };
    setCheckouts([...checkouts, newCheckout]);
    message.success('结账成功');
    form.resetFields();
  };

  const columns = [
    {
      title: '玩家ID',
      dataIndex: 'playerId',
      key: 'playerId',
    },
    {
      title: '礼物值',
      dataIndex: 'giftValue',
      key: 'giftValue',
    },
    {
      title: '实际金额',
      dataIndex: 'actualAmount',
      key: 'actualAmount',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div>
      <h2>结账系统</h2>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item
          name="playerId"
          rules={[{ required: true, message: '请输入玩家ID' }]}
        >
          <Input placeholder="玩家ID" />
        </Form.Item>
        <Form.Item
          name="giftValue"
          rules={[{ required: true, message: '请输入礼物值' }]}
        >
          <Input type="number" placeholder="礼物值" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            结账
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={checkouts} columns={columns} rowKey="id" />
    </div>
  );
};

export default Checkout;