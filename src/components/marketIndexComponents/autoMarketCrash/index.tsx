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
const AutoMarketCrash: React.FC = () => {
  const [isOpenSwitch, setIsOpenSwitch] = useState<boolean>(false);
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
    <div className="autoMarketCrashBox">
      <Card bodyStyle={{ padding: 14 }}>
        <div className="autoMarketCrashSettingBox">
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
              目标价格:0.0001BNB
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
            比例设置
          </Divider>
          <div className="contentOption">
            <div className="sliderOption">
              <Slider
                min={0}
                value={sliderValue}
                tooltip={{
                  open: true,
                  formatter: (value) => `-${value} %`, // 自定义内容
                }}
                onChange={(val) => setSliderValue(val)}
                max={100}
              />
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
            价格比例设置
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最小买入数量"
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
                label="最大卖出数量"
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
                label="卖出间隔(秒)"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">1</Button>
              <Button className="btnLeft12">5</Button>
              <Button className="btnLeft12">10</Button>
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
            执行设置{" "}
            <Select
              placeholder="选择路由"
              defaultValue={"1"}
              style={{ width: "180px", marginLeft: "24px" }}
              options={routerTypeList}
            />
          </Divider>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="任务执行时长(秒)"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">1分钟</Button>
              <Button className="btnLeft12">5分钟</Button>
              <Button className="btnLeft12">10分钟</Button>
            </div>
          </div>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最小买入比例"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">25%</Button>
              <Button className="btnLeft12">50%</Button>
              <Button className="btnLeft12">100%</Button>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最大买入比例"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">25%</Button>
              <Button className="btnLeft12">50%</Button>
              <Button className="btnLeft12">100%</Button>
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
              开始砸盘
            </Button>
          </div>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
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
export default AutoMarketCrash;
