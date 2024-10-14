import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, message } from 'antd';
import { saveData, loadData } from '../utils/storage';

const { Option } = Select;

interface Host {
  id: string;
  name: string;
  type: string;
  discount: number;
}

const HostManagement: React.FC = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData('hosts').then((data) => {
      if (data) {
        setHosts(data);
      }
    }).catch((error) => {
      console.error('Failed to load hosts:', error);
      message.error('加载主持账号失败');
    });
  }, []);

  useEffect(() => {
    saveData('hosts', hosts).catch((error) => {
      console.error('Failed to save hosts:', error);
      message.error('保存主持账号失败');
    });
  }, [hosts]);

  const onFinish = (values: any) => {
    const newHost: Host = {
      id: values.id,
      name: values.name,
      type: values.type,
      discount: values.discount,
    };
    setHosts([...hosts, newHost]);
    message.success('主持账号添加成功');
    form.resetFields();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '折扣率',
      dataIndex: 'discount',
      key: 'discount',
    },
  ];

  return (
    <div>
      <h2>主持管理</h2>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item
          name="id"
          rules={[{ required: true, message: '请输入ID' }]}
        >
          <Input placeholder="ID" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <Select placeholder="类型" style={{ width: 120 }}>
            <Option value="host">主持</Option>
            <Option value="recharge">充值号</Option>
            <Option value="owner">房主号</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="discount"
          rules={[{ required: true, message: '请输入折扣率' }]}
        >
          <Input type="number" placeholder="折扣率" step="0.01" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加主持账号
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={hosts} columns={columns} rowKey="id" />
    </div>
  );
};

export default HostManagement;