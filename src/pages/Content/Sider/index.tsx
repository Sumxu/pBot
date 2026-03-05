import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Tag, Input, Button, Select, Col, Row, Empty } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import chainListData from "@/config/chainListData";
import { useChainStore } from "@/Store/chainStore";
const SilderBox: React.FC = () => {
  const [originTokenData, setOriginTokenData] = useState([]); //链对应的原生代币
  const {chainId,setChainId}=useChainStore()
  const [pondList, setPondList] = useState([
    {
      label: "Uniswap V2",
      value: "Uniswap V2",
      address: "0xfabf....cfde",
      balanceOf: "3.77",
    },
  ]);
  const initData = () => {
    console.log("chainListData==", chainListData);
    // setOriginTokenData(chainListData[0]);
  };
  useEffect(()=>{
    console.log("chainId监听改变了----",chainId)
  },[chainId])
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="SilderBox">
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        全局设置
      </Divider>
      <div className="settingBox">
        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            RPC 地址
          </Tag>
          <div className="inputBox">
            <Input placeholder="请输入RPC地址" />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>

        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            合约地址
          </Tag>
          <div className="inputBox">
            <Input placeholder="请输入合约地址" />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>

        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            基础代币
          </Tag>
          <div className="inputBox">
            <Select
              style={{ width: "100%" }}
              placeholder="请选择原始代币"
              defaultValue={["BNB"]}
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={originTokenData.baseToken}
              optionRender={(option) => (
                <div>
                  <span role="img" aria-label={option.data.label}></span>
                  {`${option.data.label}- ${option.data.value}`}
                </div>
              )}
            />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>

        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            池子
          </Tag>
          <div className="inputBox">
            <Select
              style={{ width: "100%" }}
              placeholder="请选择池子"
              defaultValue={["Uniswap V2"]}
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={pondList}
              optionRender={(option) => (
                <div>
                  <Tag color="magenta"> {option.data.label}</Tag>
                  <Tag color="processing">{option.data.address}</Tag>
                  <Tag color="success">
                    池子余额:{option.data.balanceOf}
                    {originTokenData.baseToken[0].label}
                  </Tag>
                </div>
              )}
            />
          </div>
          <div className="rightBtn">
            <Button type="primary">保存</Button>
            <span className="spn">
              <Button type="primary">获取</Button>
            </span>
          </div>
        </div>

        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            Gas 价格
          </Tag>
          <div className="inputBox">
            <Input placeholder="请输入Gas价格" />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>

        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            贿赂金额
          </Tag>
          <div className="inputBox">
            <Input placeholder="请输入贿赂金额" />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>
      </div>
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        代币信息
      </Divider>
      <div className="tokenInfoBox">
        <div className="autoTimeOption">
          <div className="labelTxt">
            自动刷新:3秒 <span className="spn">刷新中</span>
          </div>
          <Button type="primary" icon={<RedoOutlined />}>
            手动刷新
          </Button>
        </div>
        <div className="tokenInfoTagBox">
          <Row className="tokenInfoRow">
            <Col span={8}>
              <div className="tagOption">
                <div className="label">代币价格</div>
                <div className="value">0.2222222222</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="tagOption tagInline">
                <div className="label">池子 BNB 余额</div>
                <div className="value">0.2222</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="tagOption">
                <div className="label">可掏池子 BNB 数量</div>
                <div className="value">0.2222</div>
              </div>
            </Col>
          </Row>

          <Row className="tokenInfoRow">
            <Col span={8}>
              <div className="tagOption">
                <div className="label">外部可掏池子 BNB 数量</div>
                <div className="value">0.2222</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="tagOption tagInline">
                <div className="label">持有 BNB 数量</div>
                <div className="value">0.2222</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="tagOption">
                <div className="label">持有代币数量</div>
                <div className="value">0.2222</div>
              </div>
            </Col>
          </Row>

          <Row className="tokenInfoRow">
            <Col span={8}>
              <div className="tagOption">
                <div className="label">持有代币比例</div>
                <div className="value">0.2222%</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="tagOption tagInline">
                <div className="label">池子代币占比</div>
                <div className="value">0.2222%</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        日志
      </Divider>
      <div className="logBox">
        <div className="logOption">
          <div className="tagLine"></div>
          <div className="tagName">正在监听</div>
        </div>
        <div className="dataBox">
          <Empty description="暂无数据" />
        </div>
      </div>
    </div>
  );
};

export default SilderBox;
