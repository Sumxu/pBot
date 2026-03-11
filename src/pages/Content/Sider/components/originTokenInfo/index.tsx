import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Col, Row } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useOriginTokenInfoStore } from "@/store/originTokenInfoStore";
import { useChainStore } from "@/store/chainStore";
import { DecSubt } from "@/Hooks/Utils";
const OriginTokenInfo: React.FC = () => {
  const { tokenInfo, setTokenInfo } = useOriginTokenInfoStore();
  const { originTokenName } = useChainStore();
  useEffect(() => {
    console.log("tokeInfo==", tokenInfo);
    console.log("originTokenName==", originTokenName);
  }, [tokenInfo, originTokenName]);
  return (
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
              <div className="value">{DecSubt(tokenInfo.tokenPrice, 10)}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption tagInline">
              <div className="label">池子{originTokenName}数量</div>
              <div className="value">{DecSubt(tokenInfo.usdtAmount, 4)}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption">
              <div className="label">可掏池子{originTokenName}数量</div>
              <div className="value">{DecSubt(tokenInfo.putableTokenAmount, 4)}</div>
            </div>
          </Col>
        </Row>

        <Row className="tokenInfoRow">
          <Col span={8}>
            <div className="tagOption">
              <div className="label">外部可掏池子{originTokenName}数量</div>
              <div className="value">0</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption tagInline">
              <div className="label">持有{originTokenName}数量</div>
              <div className="value">{DecSubt(tokenInfo.walletOriginTokenTotalAmount, 4)}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption">
              <div className="label">持有代币数量</div>
              <div className="value">{DecSubt(tokenInfo.walletTokenTotalAmount, 4)}</div>
            </div>
          </Col>
        </Row>

        <Row className="tokenInfoRow">
          <Col span={8}>
            <div className="tagOption">
              <div className="label">持有代币比例</div>
              <div className="value">{DecSubt(tokenInfo.walletTokenTotalAmount, 4)}%</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption tagInline">
              <div className="label">池子代币占比</div>
              <div className="value">{DecSubt(tokenInfo.walletTokenRato, 2)}%</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OriginTokenInfo;
