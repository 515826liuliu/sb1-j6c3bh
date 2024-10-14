import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, message } from 'antd';
import { RechargeType } from '../types';

const { Option } = Select;

interface RechargeRecord {
  id: string;
  playerId: string;
  amount: number;
  type: RechargeType;
  date: string;
}

const Recharges: React.FC = () => {
  const [recharges, setRecharges] = useState<RechargeRecord[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newRecharge: RechargeRecord = {
      id: Date.now().toString(),
      ...values,
      date: new Date().toLocaleString(),
    };
    setRecharges([...recharges, newRecharge]);
    message.success('充值成功');
    form.resetFields();
  };

  const columns = [
    {
      title: '玩家ID',
      dataIndex: 'playerId',
      key: 'playerId',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '充值类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div>
      <h2>充值汇总</h2>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item
          name="playerId"
          rules={[{ required: true, message: '请输入玩家ID' }]}
        >
          <Input placeholder="玩家ID" />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: '请输入充值金额' }]}
        >
          <Input type="number" placeholder="充值金额" />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: '请选择充值类型' }]}
        >
          <Select placeholder="充值类型" style={{ width: 120 }}>
            <Option value="direct">直冲</Option>
            <Option value="exchange">换冲</Option>
            <Option value="prepaid">预存冲</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            充值
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={recharges} columns={columns} rowKey="id" />
    </div>
  );
};

export default Recharges;