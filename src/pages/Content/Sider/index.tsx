import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Tag, Input, Button, Select, Col, Row, Empty } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useChainStore } from "@/Store/chainStore";
import { useMultiCall } from "@/Hooks/useMultiCallToken";
import { fromWei, isContractAddress, Totast } from "@/Hooks/Utils";
import {
  findChainById,
  findContractInfo,
  findListData,
} from "@/Utils/chainListDataUtils";
interface originTokenDataItem {
  label: string;
  value: string;
  address: string;
}
interface pondListItem {
  label: string;
  type: string;
  value: string;
}
const SilderBox: React.FC = () => {
  const { chainId, setChainId } = useChainStore(); //全局获取监听
  const [originTokenData, setOriginTokenData] = useState<originTokenDataItem[]>(
    [],
  ); //链对应的原生代币
  const [pondList, setPondList] = useState<pondListItem[]>([]); //链对应的原生代币
  const [searchAddressDisabled, setSearchAddressDisabled] =
    useState<boolean>(false); //是否禁用合约地址
  const [originTokenDataDisabled, setOriginTokenDataDisabled] =
    useState<boolean>(false); //是否禁用币种选择
  const [pondListDisabled, setPondListDisabled] = useState<boolean>(false); //是否禁用池子选择
  const [searchAddress, setSearchAddress] = useState<string>('0x80F1fF15B887CB19295D88C8c16F89d47f6D8888'); //查询合约地址
  const [originToken, setOriginToken] = useState<string>(); //原始代币地址
  const [pondType, setPondType] = useState<string>(); //选择的池子类型
  const [rpcUrl, setRpcUrl] = useState<string>(); //rpc地址
  const initData = () => {
    const findData = findChainById(chainId);
    console.log(findData);
    setPondList(findData?.pondList);
    setOriginTokenData(findData?.baseToken);
    setRpcUrl(findData?.rpcUrl);
  };
  /**
   *
   * @param val 输入的合约地址
   */
  const searchAddressChange = (val) => {
    setSearchAddress(val);
  };
  /**
   * 获取代币信息
   * 根据合约地址输入的代币地址和池子
   */
  const getTokenInfo = async () => {
    const contractResult = await isContractAddress(searchAddress, rpcUrl);
    if (!contractResult)
      return Totast(`${searchAddress}当前不是合约地址`, "error");
    if (!originToken) return Totast(`请选择合约对应的基础代币`, "error");
    if (!pondType) return Totast(`请选择合约对应的池子`, "error");
    const originTokenInfo = findListData(originTokenData, originToken);
    const pondInfo = findListData(pondList, pondType);
    findContractInfo(searchAddress, pondInfo.type, originTokenInfo.address,chainId);
  };
  useEffect(() => {
    console.log("chainId监听改变了----", chainId);
    //通过chainId拿到对应的数据进行初始化
  }, [chainId]);
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
            合约地址
          </Tag>
          <div className="inputBox">
            <Input
              placeholder="请输入合约地址"
              value={searchAddress}
              disabled={searchAddressDisabled}
              onChange={(e) => searchAddressChange(e.target.value)}
            />
          </div>
          <div className="rightBtn">
            <Button
              type="primary"
              onClick={() => setSearchAddressDisabled(!searchAddressDisabled)}
            >
              {searchAddressDisabled ? "修改" : "保存"}
            </Button>
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
              value={originToken}
              onChange={(value, option) => {
                setOriginToken(option.value);
              }}
              disabled={originTokenDataDisabled}
              options={originTokenData}
              optionRender={(option) => (
                <div>
                  <span role="img" aria-label={option.data.label}></span>
                  {`${option.data.label}- ${option.data.value}`}
                </div>
              )}
            />
          </div>
          <div className="rightBtn">
            <Button
              type="primary"
              onClick={() =>
                setOriginTokenDataDisabled(!originTokenDataDisabled)
              }
            >
              {originTokenDataDisabled ? "修改" : "保存"}
            </Button>
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
              value={pondType}
              disabled={pondListDisabled}
              onChange={(value, option) => {
                setPondType(option.value);
              }}
              options={pondList}
              optionRender={(option) => (
                <div>
                  <Tag color="magenta"> {option.data.label}</Tag>
                </div>
              )}
            />
          </div>
          <div className="rightBtn">
            <Button
              type="primary"
              onClick={() => setPondListDisabled(!pondListDisabled)}
            >
              {pondListDisabled ? "修改" : "保存"}
            </Button>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => getTokenInfo()}
          >
            获取代币信息
          </Button>
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
