import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Divider,
  Switch,
  Slider,
} from "antd";
const LimitedPrice: React.FC = () => {
  const [isOpenBuySwitch, setIsOpenBuySwitch] = useState<boolean>(false); //买入
  const [isOpenSaleSwitch, setIsOpenSaleSwitch] = useState<boolean>(false); //卖出
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [timeTypeList, setTimeTypeList] = useState([
    {
      label: "秒",
      value: "1",
    },
    {
      label: "分钟",
      value: "2",
    },
  ]);
  const [walletList, setWalletList] = useState([
    {
      label: "使用全部钱包",
      value: "1",
    },
    {
      label: "只使用选中钱包",
      value: "2",
    },
  ]);
  const [routerTypeList, setRouterTypeList] = useState([
    {
      label: "公共路由",
      value: "1",
    },
    {
      label: "隐私路由",
      value: "2",
    },
  ]);
  return (
    <div className="limitedPriceBox">
      <Card bodyStyle={{ padding: 14 }}>
        <div className="limitedPriceSettingBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            数据统计
            <Button type="primary" className="btnLeft12">
              当前价格:0.0001BNB
            </Button>
            <Button type="primary" className="btnLeft12">
              累计买入:0.0001Token
            </Button>
            <Button type="primary" className="btnLeft12">
              累计卖出:0.0001Token
            </Button>
          </Divider>
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            买入设置{" "}
            <Button type="primary">
              启动买入
              <Switch
                size="small"
                style={{ marginLeft: "12px" }}
                onChange={(val) => setIsOpenBuySwitch(val)}
                checked={isOpenBuySwitch}
              />
            </Button>
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="低于价格下单买入"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最小买入金额"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">0.1</Button>
              <Button className="btnLeft12">0.5</Button>
              <Button className="btnLeft12">1</Button>
            </div>
          </div>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最大买入金额"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">0.1</Button>
              <Button className="btnLeft12">0.5</Button>
              <Button className="btnLeft12">1</Button>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="单次卖入账号数"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">1</Button>
              <Button className="btnLeft12">5</Button>
              <Button className="btnLeft12">10</Button>
            </div>
          </div>
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            买入设置{" "}
            <Button type="primary">
              启动卖出
              <Switch
                size="small"
                style={{ marginLeft: "12px" }}
                onChange={(val) => setIsOpenSaleSwitch(val)}
                checked={isOpenSaleSwitch}
              />
            </Button>
          </Divider>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="高于价格下单卖出"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
            </div>
          </div>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最小卖出金额"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">0.1</Button>
              <Button className="btnLeft12">0.5</Button>
              <Button className="btnLeft12">1</Button>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最大卖出金额"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">0.1</Button>
              <Button className="btnLeft12">0.5</Button>
              <Button className="btnLeft12">1</Button>
            </div>
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="单次卖出账号数"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">1</Button>
              <Button className="btnLeft12">5</Button>
              <Button className="btnLeft12">10</Button>
            </div>
          </div>

          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            操作{" "}
            <Button type="primary" className="btnLeft12">
              任务执行时长:0
            </Button>
          </Divider>
          <div className="contentOption">
            <Button type="primary" className="btnLeft12 btnAuto">
              开始限价单
            </Button>
          </div>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "140px" }}
                label="预计砸盘时长(分钟)"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">5m</Button>
              <Button className="btnLeft12">10m</Button>
              <Button className="btnLeft12">30m</Button>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="预期单批账号数"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">1</Button>
              <Button className="btnLeft12">5</Button>
              <Button className="btnLeft12">10</Button>
            </div>
          </div>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="卖出百分比(%)"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button type="primary" className="btnLeft12">
                自动计算参数
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LimitedPrice;
