import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Tag, Input, Button, Select, Col, Row, Empty } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import chainListData from "@/config/chainListData";
import { useChainStore } from "@/Store/chainStore";
import { useMultiCall } from "@/Hooks/useMultiCallToken";
import { fromWei } from "@/Hooks/Utils";
const SilderBox: React.FC = () => {
  const { multiCall } = useMultiCall(
    "https://bsc-dataseed.binance.org/",
    "0xca11bde05977b3631167028862be2a173976ca11", // BSC Multicall
  );
  const [originTokenData, setOriginTokenData] = useState([]); //链对应的原生代币
  const { chainId, setChainId } = useChainStore();
  const [pondList, setPondList] = useState([
    {
      label: "Uniswap V2",
      value: "Uniswap V2",
      address: "0xfabf....cfde",
      balanceOf: "3.77",
    },
  ]);

  const initData = async () => {
    const factoryAbi = [
      "function getPair(address tokenA, address tokenB) external view returns (address pair)",
    ];
    const calls: any[] = [
      {
        address: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
        abi: factoryAbi,
        method: "getPair",
        params: [
          "0x80F1fF15B887CB19295D88C8c16F89d47f6D8888",
          // "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",wbnb
          "0x55d398326f99059fF775485246999027B3197955", //usdt
        ],
      },
    ];

    const res = await multiCall(calls);
    const pairAddress = res[0][0];
    console.log("res==", res);
    console.log("respairAddress==", pairAddress);
    initPairAddressInfo(pairAddress);
  };
  const initPairAddressInfo = async (pairAddress: string) => {
    const USDT = "0x55d398326f99059fF775485246999027B3197955";
    const pairAbi = [
      "function token0() view returns (address)",
      "function token1() view returns (address)",
      "function getReserves() view returns (uint112 reserve0,uint112 reserve1,uint32)",
    ];
    
    const pairCalls = [
      {
        address: pairAddress,
        abi: pairAbi,
        method: "token0",
      },
      {
        address: pairAddress,
        abi: pairAbi,
        method: "token1",
      },
      {
        address: pairAddress,
        abi: pairAbi,
        method: "getReserves",
      },
      {
        address: pairAddress,
        abi: pairAbi,
        method: "totalSupply",
      },
    ];

    const res = await multiCall(pairCalls);
    const token0 = res[0][0];
    const token1 = res[1][0];
    const totalSupplyAmount = Number(fromWei(res[3]));

    console.log("res=totalSupplyAmount=", totalSupplyAmount);
    console.log("res=totalSupplyAmount=", res);
    const reserve0 = res[2][0];
    const reserve1 = res[2][1];
    console.log("res=token0=", token0);
    console.log("token1=1=", token1);
    console.log("reserve0=1=", reserve0);
    console.log("reserve1=1=", reserve1);
    let tokenReserve;
    let usdtReserve;
    if (token0.toLowerCase() === USDT.toLowerCase()) {
      usdtReserve = reserve0;
      tokenReserve = reserve1;
    } else if (token1.toLowerCase() === USDT.toLowerCase()) {
      usdtReserve = reserve1;
      tokenReserve = reserve0;
    } else {
      throw new Error("池子不包含 USDT");
    }
    const usdtAmount = Number(fromWei(usdtReserve));
    const tokenAmount = Number(fromWei(tokenReserve));
    // 代币价格（USDT）
    const tokenPriceUSDT = usdtAmount / tokenAmount; 
    console.log(`池子的代币价格:`,tokenPriceUSDT);
    console.log(`池子的代币数量:`,tokenAmount);
    //代币占比
    const tokenRato=tokenAmount/totalSupplyAmount
    console.log(`tokenRato 占比:`,tokenRato);
    // 假设 tokenPriceUSDT 已经知道
    const tokenValueInUSDT = tokenAmount * tokenPriceUSDT;
    console.log("=池子usdt数量=",tokenValueInUSDT)
      // 外部可提 USDT（假设全部 LP 已锁定，外部可提 = 0）
    console.log("=外部可掏池子=",usdtAmount)

  };
  useEffect(() => {
    console.log("chainId监听改变了----", chainId);
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
