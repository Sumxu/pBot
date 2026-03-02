import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Tag, Input, Button } from "antd";
const SilderBox: React.FC = () => {
  const initData = () => {};
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="SilderBox">
      <Divider orientation="center" plain>
        全局设置
      </Divider>
      <div className="settingBox">
        <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            RPC 地址
          </Tag>
          <div className="inputBox">
            <Input />
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
            <Input />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>

         <div className="settingOption">
          <Tag color="#108ee9" className="tagLeft">
            Gas 价格
          </Tag>
          <div className="inputBox">
            <Input/>
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
            <Input />
          </div>
          <div className="rightBtn">
            <Button type="primary">修改</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilderBox;
