import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import {
  Divider,
  Input,
  Select,
  Button,
  Table,
  Empty,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import GenerateDialog from "./components/generateDialog";
import ImportWallet from "./components/ImportWallet";
import {
  getWalletPage,
  getAllWallet,
  deleteWallet,
  deleteWalletsByIds,
  deleteAllWallets,
  getByTag,
  getWalletByAddress,
} from "@/Idb/Servers/walletService";
import {checkValue } from "@/Hooks/Utils";
import { BigNumber } from "ethers";
interface walletItem {
  id: number;
  address: string; //地址
  tag: string; //标签
  privateKey: string; //私钥
  esc20Balance: BigNumber; //代币余额
  originalTokenBalance: BigNumber; //原始代币余额
  saleOriginalTokenBalance: BigNumber; //可卖出余额
}
const WalletBox: React.FC = () => {
  const [generateDialogOpen, setGenerateDialogOpen] = useState<boolean>(false); //是否展示 创建钱包弹窗
  const [importWalletOpen, setImportWalletOpen] = useState<boolean>(false); //是否展示 导入钱包弹窗
  const [pageSize, setPageSize] = useState<number>(10); //每次查询对应多少条数据
  const [current, setCurrent] = useState<number>(1); //当前查询的第几页数据
  const [total, setTotal] = useState<number>(0); //钱包总数
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); //列表全中的数据
  const [tagValue, setTagValue] = useState<string>(); //选中的标签key
  const [tagList, setTagList] = useState([]); //钱包标签
  const [dataSource, setDataSource] = useState<walletItem[]>([]); //钱包列表
  const [walletAddress, setWalletAddress] = useState<string>(); //需要查询的钱包地址
  const [minBalanceOf, setMinBalanceOf] = useState<number>(); //最小余额
  const [maxBalanceOf, setMaxBalanceOf] = useState<number>(); //最大余额
  const [delTitle, setDelTitle] =
    useState<string>("提示:删除后此钱包将永久无法恢复!");

  const [delDescription, setDelDescription] =
    useState<string>("是否删除当前钱包");

  const [checkAllTitle, setCheckAllTitle] =
    useState<string>("提示:选中当前列表数据");

  const [checkAllDescription, setCheckAllDescription] =
    useState<string>("是否全选");
  const [checkDelAllDescription, setCheckDelAllDescription] =
    useState<string>("是否删除选中钱包");
  const [checkDelTitle, setCheckDelTitle] = useState<string>(
    "提示:删除选中后的钱包将永久无法恢复!",
  );

  const [delAllDescription, setDelAllDescription] =
    useState<string>("是否删除所有钱包");

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
      dataIndex: "address",
      key: "address",
      width: 370,
    },
    {
      title: "BNB余额",
      dataIndex: "originalTokenBalance",
      key: "originalTokenBalance",
    },
    {
      title: "代币余额",
      dataIndex: "esc20Balance",
      key: "esc20Balance",
    },
    {
      title: "可卖BNB",
      dataIndex: "saleOriginalTokenBalance",
      key: "saleOriginalTokenBalance",
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
        <Popconfirm
          title={delTitle}
          description={delDescription}
          okText="确认删除"
          okType="danger"
          cancelText="取消"
          onConfirm={() => handleDelete(record)}
          placement="topLeft"
        >
          <Button danger size="small">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];
  /**
   * 打开生成钱包弹窗
   */
  const openGenerate = async () => {
    setGenerateDialogOpen(true);
  };
  /**
   * 全部勾选当前页面的列表
   */
  const allCheckWalletChange = () => {
    //全部选择
    const keys = dataSource.map((item) => item.id);
    setSelectedRowKeys(keys);
  };
  //创建钱包成功
  const generateSuccess = () => {
    setGenerateDialogOpen(false);
    initData();
    initTagList();
  };
   //导入钱包成功
  const importWalletSuccess = () => {
    setImportWalletOpen(false);
    initData();
    initTagList();
  };
  // ✅ 删除单个事件
  const handleDelete = async (record) => {
    await deleteWallet(record.id);
    initData();
    initTagList();
  };
  /**
   *
   * @returns 批量删除对应的列表
   */
  const checkDelWalletChange = async () => {
    if (selectedRowKeys.length == 0) {
      return message.info("请选中要删除的数据");
    }
    await deleteWalletsByIds(selectedRowKeys);
    initData();
  };
  /**
   * 删除所有钱包
   */
  const delAllWallet = async () => {
    await deleteAllWallets();
    initData();
  };
  // 多选
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  /**
   * 查询钱包标签数据和钱包列表总数
   */
  const initTagList = async () => {
    const walletAll = await getAllWallet();
    setTotal(walletAll.length);
    const tagList = await groupByTag(walletAll);
    setTagList(tagList);
  };
  /**
   * 初始化获取钱包列表数据
   * 得到钱包列表的总数
   */
  const initData = async () => {
    // const walletList = await getWalletPage(current, pageSize);
    const walletList = await getAllWallet();
    setDataSource(walletList);
  };
  /**
   *
   * @param page 第几页
   * @param size 每次查询数据
   */
  const tablePageChange = async (page, size) => {
    setCurrent(page);
    setPageSize(size);
    const walletList = await getWalletPage(page, size);
    setDataSource(walletList);
  };
  /**
   *
   * @param list 从list去重 得到标签列表
   * @returns
   */
  const groupByTag = (list: any[]) => {
    const tags = [...new Set(list.map((item) => item.tag))];
    return tags.map((tag) => ({
      label: tag,
      value: tag,
    }));
  };
  /**
   * 通过查询条件获取对应的钱包数据列表
   */
  const searchTableChange = async () => {
    console.log("walletAddress==",walletAddress)
    //只查询钱包地址只有一个结果
    if (checkValue(walletAddress?.trim())) {
      //钱包有内容
      const walletResult = await getWalletByAddress(walletAddress);
      console.log("walletResult=", walletResult);
      setTotal(1);
      setDataSource([walletResult]);
      return;
    }
    //只查询钱包标签
    if (
      checkValue(tagValue) &&
      !checkValue(minBalanceOf) &&
      !checkValue(maxBalanceOf)
    ) {
      const tagListResult = await getByTag(tagValue);
      setTotal(tagListResult.length);
      setDataSource(tagListResult);
      return;
    }
    //只查询钱包最小余额和最大余额
    if (
      !checkValue(tagValue) &&
      checkValue(minBalanceOf) &&
      checkValue(maxBalanceOf)
    ) {
      const walletResult = await getAllWallet();
      const getList: Array = filterByRange(
        walletResult,
        minBalanceOf,
        maxBalanceOf,
      );
      setTotal(getList.length);
      setDataSource(getList);
      return;
    }
    //如果选择了标签 或者输入了最小金额
    if (
      checkValue(tagValue) &&
      checkValue(minBalanceOf) &&
      checkValue(maxBalanceOf)
    ) {
      const tagListResult = await getByTag(tagValue);
      const getList: Array = filterByRange(
        tagListResult,
        minBalanceOf,
        maxBalanceOf,
      );
      setTotal(getList.length);
      setDataSource(getList);
      return;
    }
    initData();
    initTagList();
  };
  /**
   *
   * @param list 数据源
   * @param min 最小金额
   * @param max 最大金额
   * @returns
   */
  const filterByRange = (list: any[], min: number, max: number) => {
    const result = list.filter((item) => {
      const value = Number(item.originalTokenBalance);
      console.log("");
      return value >= min && value <= max;
    });
    return result;
  };
  useEffect(() => {
    initData();
    initTagList();
  }, []);
  return (
    <div className="walletPage">
      <div className="walletBox">
        <div className="searchOption">
          <div className="searchInput">
            <Input
              placeholder="搜索钱包地址"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <div className="">
            <Select
              placeholder="选择钱包标签"
              options={tagList}
              value={tagValue}
              allowClear
              onChange={(e) => setTagValue(e)}
              style={{ maxWidth: "160px" }}
            />
          </div>
          <div className="otherInput">
            <InputNumber
              placeholder="最小代币余额"
              value={minBalanceOf}
              style={{ maxWidth: "240px", minWidth: "7vw" }}
              onChange={(e) => setMinBalanceOf(e)}
            />
          </div>
          <div className="otherInput">
            <InputNumber
              placeholder="最大代币余额"
              value={maxBalanceOf}
              style={{ maxWidth: "240px", minWidth: "7vw" }}
              onChange={(e) => setMaxBalanceOf(e)}
            />
          </div>
        </div>
        <div className="tableBox">
          <div className="toolsOption">
            <Button type="primary" onClick={()=>setImportWalletOpen(true)}>导入钱包</Button>
            <Button type="primary" onClick={openGenerate}>
              生成钱包
            </Button>
            <Button type="primary">导出钱包</Button>
            <Popconfirm
              title={checkAllTitle}
              description={checkAllDescription}
              okText="确认全选"
              okType="primary"
              cancelText="取消"
              onConfirm={() => allCheckWalletChange()}
              placement="topLeft"
            >
              <Button color="default" variant="outlined">
                全选
              </Button>
            </Popconfirm>

            <Button type="primary" onClick={() => searchTableChange()}>
              查询
            </Button>

            <Popconfirm
              title={checkDelTitle}
              description={checkDelAllDescription}
              okText="确认批量删除"
              okType="danger"
              cancelText="取消"
              onConfirm={() => checkDelWalletChange()}
              placement="topLeft"
            >
              <Button type="primary" danger>
                批量删除
              </Button>
            </Popconfirm>

            <Popconfirm
              title={checkDelTitle}
              description={delAllDescription}
              okText="确认删除所有钱包"
              okType="danger"
              cancelText="取消"
              onConfirm={() => delAllWallet()}
              placement="topLeft"
            >
              <Button type="primary" danger>
                删除所有钱包
              </Button>
            </Popconfirm>
          </div>
          <div className="tableOption">
            <Table
              dataSource={dataSource}
              rowSelection={rowSelection}
              columns={columns}
              rowKey="id"
              pagination={{
                total: total,
                showTotal: (total) => `共 ${total} 条`,
              }}
              locale={{
                emptyText: <Empty description="暂无数据" />,
              }}
            />
          </div>
        </div>
      </div>
      <GenerateDialog
        open={generateDialogOpen}
        onCancel={() => setGenerateDialogOpen(false)}
        onOk={generateSuccess}
      />
      <ImportWallet open={importWalletOpen} 
      onOk={importWalletSuccess}
      onCancel={()=>setImportWalletOpen(false)} />

    </div>
  );
};
export default WalletBox;
