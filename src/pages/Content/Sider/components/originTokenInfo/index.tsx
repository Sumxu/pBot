import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Button, Col, Row } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useOriginTokenInfoStore } from "@/store/originTokenInfoStore";
import { useChainStore } from "@/store/chainStore";
import { DecSubt, msToSeconds } from "@/Hooks/Utils";
import autoRefreshConfig from "@/config/autoRefreshData";

const OriginTokenInfo: React.FC = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
  const { tokenInfo } = useOriginTokenInfoStore();
  const { originTokenName, setAutoTriggerEvent } = useChainStore();
  const startAutoRefresh = () => {
    if (timerRef.current) return; // 防止重复启动
    timerRef.current = setInterval(async () => {
      await autoRefreshChange();
    }, autoRefreshConfig);
  };
  const stopAutoRefresh = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  /**
   * 手动刷新
   */
  const refreshChange = async () => {
    stopAutoRefresh(); // ❗暂停自动刷新
    setRefreshLoading(true);
    try {
      await setAutoTriggerEvent();
    } finally {
      setTimeout(() => {
        setRefreshLoading(false);
      }, 500);
      startAutoRefresh(); // ❗重新启动自动刷新
    }
  };
  /**
   * 自动刷新
   */
  const autoRefreshChange = async () => {
    setAutoRefresh(true);
    try {
      await setAutoTriggerEvent();
    } finally {
      setTimeout(() => {
        setAutoRefresh(false);
      }, 500);
    }
  };
  useEffect(() => {
    startAutoRefresh();
    return () => {
      stopAutoRefresh();
    };
  }, []);
  useEffect(() => {}, [tokenInfo, originTokenName]);
  return (
    <div className="tokenInfoBox">
      <div className="autoTimeOption">
        <div className="labelTxt">
          自动刷新:{msToSeconds(autoRefreshConfig)} 秒
          {autoRefresh && <span className="spn">刷新中</span>}
        </div>

        <Button
          type="primary"
          loading={refreshLoading}
          icon={<RedoOutlined />}
          onClick={() => refreshChange()}
        >
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
              <div className="value">
                {DecSubt(tokenInfo.originTokenAmount, 4)}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption">
              <div className="label">可掏池子{originTokenName}数量</div>
              <div className="value">
                {DecSubt(tokenInfo.putableTokenAmount, 4)}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="tokenInfoRow">
          <Col span={8}>
            <div className="tagOption">
              <div className="label">外部可掏池子{originTokenName}数量</div>
              <div className="value">
                {DecSubt(tokenInfo.externalOriginAmount, 4)}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption tagInline">
              <div className="label">持有{originTokenName}数量</div>
              <div className="value">
                {DecSubt(tokenInfo.walletOriginTokenTotalAmount, 4)}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption">
              <div className="label">持有代币数量</div>
              <div className="value">
                {DecSubt(tokenInfo.walletTokenTotalAmount, 4)}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="tokenInfoRow">
          <Col span={8}>
            <div className="tagOption">
              <div className="label">持有代币比例</div>
              <div className="value">
                {DecSubt(tokenInfo.walletTokenRato, 4)}%
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="tagOption tagInline">
              <div className="label">池子代币占比</div>
              <div className="value">{DecSubt(tokenInfo.tokenRato, 2)}%</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OriginTokenInfo;
