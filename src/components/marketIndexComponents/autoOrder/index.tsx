import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Card, Form, Input, Select, Divider, Switch } from "antd";
const AutoOrder: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
  const [typeList, setTypeList] = useState([
    {
      label: "震荡模式",
      value: "1",
    },
    {
      label: "捆绑模式",
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
    <div className="autoOrderBox">
      <Card bodyStyle={{ padding: 14 }}>
        <div className="autoOrderSettingBox">
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
              累计花费基础代币:0.0001BNB
            </Button>
            <Button type="primary" className="btnLeft12">
              累计卖出代币:0.0001BNB
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
            模式选择{" "}
            <Select
              placeholder="选择钱包标签"
              defaultValue={"1"}
              style={{ width: "120px" }}
              options={typeList}
            />
            <span className="btnLeft12">
              超出价格范围时停止:
              <Switch checked={switchChecked} className="btnLeft12" />
            </span>
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
            价格比例设置
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="价格比例下限(%)"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="价格比例上限(%)"
                className="btnLeft12"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
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
            买入/卖出设置{" "}
            <Select
              placeholder="选择钱包标签"
              defaultValue={"1"}
              style={{ width: "180px" }}
              options={walletList}
            />
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
                label="最小买入金额"
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
                label="最大买入金额"
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

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="买入/卖出比例"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">50/50</Button>
              <Button className="btnLeft12">75/25</Button>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="买入间隔(秒)"
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
                label="单次买入账号数"
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
                label="持续时间(分)"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">1分钟</Button>
              <Button className="btnLeft12">5分钟</Button>
              <Button className="btnLeft12">10分钟</Button>
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
              开始刷量
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default AutoOrder;
