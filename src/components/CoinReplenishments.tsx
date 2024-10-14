import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, message } from 'antd';
import { saveData, loadData } from '../utils/storage';

interface CoinReplenishment {
  id: string;
  hostId: string;
  playerId: string;
  amount: number;
  date: string;
}

const CoinReplenishments: React.FC = () => {
  const [replenishments, setReplenishments] = useState<CoinReplenishment[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData('coinReplenishments').then((data) => {
      if (data) {
        setReplenishments(data);
      }
    }).catch((error) => {
      console.error('Failed to load coin replenishments:', error);
      message.error('加载补币记录失败');
    });
  }, []);

  useEffect(() => {
    saveData('coinReplenishments', replenishments).catch((error) => {
      console.error('Failed to save coin replenishments:', error);
      message.error('保存补币记录失败');
    });
  }, [replenishments]);

  const onFinish = (values: any) => {
    const newReplenishment: CoinReplenishment = {
      id: Date.now().toString(),
      hostId: values.hostId,
      playerId: values.playerId,
      amount: values.amount,
      date: new Date().toLocaleString(),
    };
    setReplenishments([...replenishments, newReplenishment]);
    message.success('补币记录添加成功');
    form.resetFields();
  };

  const columns = [
    {
      title: '主持ID',
      dataIndex: 'hostId',
      key: 'hostId',
    },
    {
      title: '玩家ID',
      dataIndex: 'playerId',
      key: 'playerId',
    },
    {
      title: '补币数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div>
      <h2>补币系统</h2>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item
          name="hostId"
          rules={[{ required: true, message: '请输入主持ID' }]}
        >
          <Input placeholder="主持ID" />
        </Form.Item>
        <Form.Item
          name="playerId"
          rules={[{ required: true, message: '请输入玩家ID' }]}
        >
          <Input placeholder="玩家ID" />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: '请输入补币数量' }]}
        >
          <Input type="number" placeholder="补币数量" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加补币记录
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={replenishments} columns={columns} rowKey="id" />
    </div>
  );
};

export default CoinReplenishments;