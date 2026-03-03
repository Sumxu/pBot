import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Input, Select, Button, Table, Empty } from "antd";
import MarketIndex from "./components/marketIndex";
const MarketManagement: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tagList, setTagList] = useState([
    {
      label: "全部",
      value: "1",
    },
  ]); //钱包标签

  const dataSource = []; //钱包数据源
  const columns = [
    // ✅ 序号列
    {
      title: "序号",
      key: "index",
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: "钱包地址",
      dataIndex: "name",
      key: "name",
      width: 370,
    },
    {
      title: "BNB余额",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "代币余额",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "可卖BNB",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "标签",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button danger size="small" onClick={() => handleDelete(record)}>
          删除
        </Button>
      ),
    },
  ];
  // ✅ 删除事件
  const handleDelete = (record) => {
    console.log("删除行:", record);
  };

  // ✅ 多选配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  return (
    <div className="marketManagementBox">
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        市值管理
      </Divider>
      <div className="marketBox">
        <MarketIndex />
      </div>
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        钱包管理
      </Divider>
      <div className="walletBox">
        <div className="searchOption">
          <div className="searchInput">
            <Input placeholder="搜索钱包地址" />
          </div>
          <div className="">
            <Select placeholder="选择钱包标签" options={tagList} />
          </div>
          <div className="otherInput">
            <Input placeholder="最小余额" />
          </div>
          <div className="otherInput">
            <Input placeholder="最大余额" />
          </div>
          <div className="otherInput">
            <Input placeholder="单页余额" />
          </div>
        </div>
        <div className="tableBox">
          <div className="toolsOption">
            <Button type="primary">手动刷新</Button>
            <Button type="primary">导入钱包</Button>
            <Button type="primary">生成钱包</Button>
            <Button type="primary">导出钱包</Button>
            <Button color="default" variant="outlined">
              全选
            </Button>
          </div>
          <div className="tableOption">
            <Table
              dataSource={dataSource}
              rowSelection={rowSelection}
              columns={columns}
              locale={{
                emptyText: <Empty description="暂无数据" />,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarketManagement;
