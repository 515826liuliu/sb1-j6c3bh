import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';

const DailyRevenue: React.FC = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    totalExpense: 0,
    profit: 0,
    hourlyRevenue: Array(24).fill(0),
  });

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use mock data
    const mockData = {
      totalRevenue: 10000,
      totalExpense: 7000,
      profit: 3000,
      hourlyRevenue: [
        300, 200, 100, 50, 30, 20, 10, 50, 100, 200, 300, 400,
        500, 600, 700, 800, 900, 1000, 1100, 1000, 900, 800, 700, 600
      ],
    };
    setRevenueData(mockData);
  }, []);

  const option = {
    title: {
      text: '每小时营收',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: revenueData.hourlyRevenue,
        type: 'line',
        smooth: true,
      },
    ],
  };

  return (
    <div>
      <h2>今日营收状况</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="总收入" value={revenueData.totalRevenue} prefix="¥" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="总支出" value={revenueData.totalExpense} prefix="¥" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="利润" value={revenueData.profit} prefix="¥" />
          </Card>
        </Col>
      </Row>
      <ReactECharts option={option} style={{ height: 400, marginTop: 20 }} />
    </div>
  );
};

export default DailyRevenue;