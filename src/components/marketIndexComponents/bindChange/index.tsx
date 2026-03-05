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
  Tag,
} from "antd";
const BindChange: React.FC = () => {
  const [isOpenBuySwitch, setIsOpenBuySwitch] = useState<boolean>(false); //买入
  const [isOpenSaleSwitch, setIsOpenSaleSwitch] = useState<boolean>(false); //卖出
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [gasWalletList, setGasWalletList] = useState([]);
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
    <div className="bindChangeBox">
      <Card bodyStyle={{ padding: 14 }}>
        <div className="bindChangeSettingBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            选择钱包
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="选择主钱包"
                className="fromItem"
              >
                <Select
                  placeholder="选择主钱包"
                  style={{ width: "370px" }}
                  options={gasWalletList}
                />
              </Form.Item>
            </div>

            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="卖出"
                className="fromItem"
              >
                <Select
                  placeholder="卖出"
                  style={{ width: "370px" }}
                  options={gasWalletList}
                />
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
            换手比例设置
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="换手比例"
                className="fromItem"
              >
                <Input placeholder="请输入" className="inputWidth" />
              </Form.Item>
              <Button className="btnLeft12">20%</Button>
              <Button className="btnLeft12">50%</Button>
              <Button className="btnLeft12">70%</Button>
              <Button className="btnLeft12">100%</Button>
              <Tag color="magenta" className="btnLeft12">
                实际卖出:0代币
              </Tag>
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
          </Divider>
          <div className="contentOption">
            <Button type="primary" className="btnLeft12 btnAuto">
              开始换手(0)
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default BindChange;
