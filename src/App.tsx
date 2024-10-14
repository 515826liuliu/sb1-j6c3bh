import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import PlayerAccounts from './components/PlayerAccounts';
import RechargeRecords from './components/RechargeRecords';
import HostManagement from './components/HostManagement';
import CoinReplenishments from './components/CoinReplenishments';
import Checkout from './components/Checkout';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const menuItems: MenuProps['items'] = [
    { key: '1', label: <Link to="/players">玩家账号</Link> },
    { key: '2', label: <Link to="/recharge-records">充值记录</Link> },
    { key: '3', label: <Link to="/host-management">主持管理</Link> },
    { key: '4', label: <Link to="/coin-replenishments">补币系统</Link> },
    { key: '5', label: <Link to="/checkout">结账系统</Link> },
  ];

  return (
    <Router>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ margin: '16px 0' }}>
            <Routes>
              <Route path="/players" element={<PlayerAccounts />} />
              <Route path="/recharge-records" element={<RechargeRecords />} />
              <Route path="/host-management" element={<HostManagement />} />
              <Route path="/coin-replenishments" element={<CoinReplenishments />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>天海开营收系统 ©2023</Footer>
      </Layout>
    </Router>
  );
};

export default App;