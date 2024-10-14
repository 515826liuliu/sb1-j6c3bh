import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { saveData, loadData } from '../utils/storage';

interface Player {
  id: string;
  name: string;
  discount: number;
}

const PlayerAccounts: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData('players').then((data) => {
      if (data) {
        setPlayers(data);
      }
    }).catch((error) => {
      console.error('Failed to load players:', error);
      message.error('加载玩家数据失败');
    });
  }, []);

  useEffect(() => {
    saveData('players', players).catch((error) => {
      console.error('Failed to save players:', error);
      message.error('保存玩家数据失败');
    });
  }, [players]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newPlayer: Player = {
        id: values.id,
        name: values.name,
        discount: values.discount,
      };
      setPlayers([...players, newPlayer]);
      setIsModalVisible(false);
      form.resetFields();
      message.success('玩家添加成功');
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      title: '折扣率',
      dataIndex: 'discount',
      key: 'discount',
    },
  ];

  return (
    <div>
      <h2>玩家账号管理</h2>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        添加玩家账号
      </Button>
      <Table dataSource={players} columns={columns} rowKey="id" />
      <Modal
        title="添加玩家"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: '请输入玩家ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入玩家姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="折扣率"
            rules={[{ required: true, message: '请输入折扣率' }]}
          >
            <InputNumber min={0} max={1} step={0.01} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlayerAccounts;