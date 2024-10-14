import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, message } from 'antd';
import { saveData, loadData } from '../utils/storage';

const { Option } = Select;

interface RechargeRecord {
  id: string;
  playerId: string;
  amount: number;
  type: string;
  date: string;
}

const RechargeRecords: React.FC = () => {
  const [records, setRecords] = useState<RechargeRecord[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData('rechargeRecords').then((data) => {
      if (data) {
        setRecords(data);
      }
    }).catch((error) => {
      console.error('Failed to load recharge records:', error);
      message.error('加载充值记录失败');
    });
  }, []);

  useEffect(() => {
    saveData('rechargeRecords', records).catch((error) => {
      console.error('Failed to save recharge records:', error);
      message.error('保存充值记录失败');
    });
  }, [records]);

  const onFinish = (values: any) => {
    const newRecord: RechargeRecord = {
      id: Date.now().toString(),
      ...values,
      date: new Date().toLocaleString(),
    };
    setRecords([...records, newRecord]);
    message.success('充值记录添加成功');
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
      <h2>充值记录</h2>
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
            <Option value="credit">赊账</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加充值记录
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={records} columns={columns} rowKey="id" />
    </div>
  );
};

export default RechargeRecords;