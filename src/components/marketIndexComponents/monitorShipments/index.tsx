import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Card, Form, Input, Select, Divider, Empty, Tag } from "antd";
const MonitorShipments: React.FC = () => {
  return (
    <div className="monitorShipmentsBox">
      <Card bodyStyle={{ padding: 14, background: "#f5f5f5" }}>
        <div className="contentBox">
          <div className="leftContent">
            <Divider
              orientation="center"
              plain
              style={{
                marginTop: 0,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              出货配置
            </Divider>

            <Divider
              orientation="left"
              plain
              style={{
                marginTop: 0,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              跟卖间隔(s)
            </Divider>
            <div className="contentOption">
              <div className="fromOption">
                <Form.Item label="最小时间" labelCol={{ flex: "100px" }}>
                  <Input placeholder="请输入最小时间" className="inputBuy" />
                </Form.Item>
              </div>

              <div className="fromOption">
                <Form.Item label="最大时间" labelCol={{ flex: "120px" }}>
                  <Input placeholder="请输入最大时间" className="inputBuy" />
                </Form.Item>
              </div>
            </div>
            <Divider
              orientation="left"
              plain
              style={{
                marginTop: 0,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              跟卖比例(%)
            </Divider>
            <div className="contentOption">
              <div className="fromOption">
                <Form.Item label="出货比例" labelCol={{ flex: "100px" }}>
                  <Input placeholder="请输入出货比例" className="inputBuy" />
                </Form.Item>
              </div>

              <div className="fromOption">
                <div className="btnListOption">
                  <Button className="btnRight12">20%</Button>
                  <Button className="btnRight12">50%</Button>
                  <Button className="btnRight12">75%</Button>
                  <Button className="btnRight12">100%</Button>
                  <Button className="btnRight12">200%</Button>
                </div>
              </div>
            </div>
            <Divider
              orientation="left"
              plain
              style={{
                marginTop: 0,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              最小买入金额阈值
            </Divider>
            <div className="contentOption">
              <div className="fromOption">
                <Form.Item
                  label="最小买入金额(0表示不限制)"
                  labelCol={{ flex: "200px" }}
                >
                  <Input placeholder="请设置" className="inputBuy" />
                </Form.Item>
              </div>

              <div className="fromOption">
                <div className="btnListOption">
                  <Button className="btnRight12">无限制</Button>
                  <Button className="btnRight12">0.1BNB</Button>
                  <Button className="btnRight12">1 BNB</Button>
                </div>
              </div>
            </div>
            <Divider
              orientation="left"
              plain
              style={{
                marginTop: 0,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              已出货数量 <Tag color="magenta">0 代币</Tag>
            </Divider>

            <Divider
              orientation="left"
              plain
              style={{
                marginTop: 0,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              操作
            </Divider>
            <div className="contentOption">
              <div className="btnListOption">
                <Button type="primary">开始监听出货</Button>
                <Button type="primary" danger className="btnRight12">
                  停止监听出货
                </Button>
              </div>
            </div>
          </div>
          <div className="rightContent">
            <Divider
              orientation="center"
              plain
              style={{
                marginTop: 0,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              交易日志 <Tag color="#1677ff">监听中</Tag>
              <Tag color="#ff4d4f">停止监听</Tag>
            </Divider>
            <div className="logsBox">
              <Empty description="暂无数据" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default MonitorShipments;
