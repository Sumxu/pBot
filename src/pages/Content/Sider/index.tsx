import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Tag, Input, Button, Select, Col, Row, Empty } from "antd";
import { useChainStore } from "@/Store/chainStore";
import { isContractAddress, Totast } from "@/Hooks/Utils";
import Logs from "./components/logs";
import OriginTokenInfo from "./components/originTokenInfo";
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
  const { chainId,setOriginTokenName,setSearchAddressStore,timeTrigger,setAutoTriggerEvent} = useChainStore(); //全局获取监听
  const [findDataLoading, setFindDataLoading] = useState<boolean>(false); //代币信息加载中
  const [originTokenData, setOriginTokenData] = useState<originTokenDataItem[]>(
    [],
  ); //链对应的原生代币
  const [pondList, setPondList] = useState<pondListItem[]>([]); //链对应的原生代币
  const [searchAddressDisabled, setSearchAddressDisabled] =
    useState<boolean>(false); //是否禁用合约地址
  const [originTokenDataDisabled, setOriginTokenDataDisabled] =
    useState<boolean>(false); //是否禁用币种选择
  const [pondListDisabled, setPondListDisabled] = useState<boolean>(false); //是否禁用池子选择
  const [searchAddress, setSearchAddress] = useState<string>(
    "0xc8F4E6857C75f1c61e41202cF9c3eBa548AE4baA",
  ); //查询合约地址
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
    const originTokenInfo = findListData(originTokenData, "value", originToken);
    const pondInfo = findListData(pondList, "value", pondType);
    
    try {
      setFindDataLoading(true);
      setSearchAddressStore(searchAddress)
      await findContractInfo(
        searchAddress,
        pondInfo.type,
        originTokenInfo.address,
        chainId,
      );
      setSearchAddressDisabled(true);
      setOriginTokenDataDisabled(true);
      setPondListDisabled(true);
    } catch (error) {
      console.error(error);
    } finally {
      setFindDataLoading(false);
    }
  };
  /**
   *
   * @param originValue 原始代币值
   */
  const originTokenChange = (originValue) => {
    setOriginToken(originValue);
    if(originValue==''||originValue==undefined)return
    const originTokenInfo = findListData(originTokenData, "value", originValue);
    setOriginTokenName(originTokenInfo.label);
  };
  useEffect(() => {
    console.log("chainId监听改变了----", chainId);
    //通过chainId拿到对应的数据进行初始化
  }, [chainId]);
   useEffect(() => {
    console.log("timeTrigger监听改变了----", timeTrigger);
    console.log("timeTrigger监听改变了-originToken---", originToken);
    getTokenInfo()
  }, [timeTrigger]);
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
                originTokenChange(option.value);
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
            loading={findDataLoading}
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
      <OriginTokenInfo></OriginTokenInfo>
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
      <Logs></Logs>
    </div>
  );
};

export default SilderBox;
