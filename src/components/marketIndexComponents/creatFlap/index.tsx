import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Space,
  Upload,
  message,
  Select,
  Tag,
  Switch,
} from "antd";
const CreatFlap: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
  const { Search } = Input;
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const [pondList, setPondList] = useState([
    // {
    //   label: "标签1",
    //   value: "标签1",
    //   address: "0xfabf....cfde",
    //   balanceOf: "3.77",
    // },
  ]);

  const [bindList, setBindList] = useState([
    {
      label: "标签1",
      value: "标签1",
      address: "0xfabf....cfde",
      balanceOf: "3.77",
    },
    {
      label: "标签2",
      value: "标签2",
      address: "0xfabf....cfde",
      balanceOf: "3.77",
    },
    {
      label: "标签3",
      value: "标签3",
      address: "0xfabf....cfde",
      balanceOf: "3.77",
    },
  ]);
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const switchOnChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setSwitchChecked(checked);
  };
  return (
    <div className="CreatFlapBox">
      <Card>
        <div className="cradOption">
          <div className="inputOption">
            <Input placeholder="请输入仿盘合约地址" allowClear></Input>
          </div>
          <div className="rightBtn">
            <Button type="primary">一键仿盘</Button>
          </div>
        </div>
        <div className="cradOption">
          <div className="inputOption">
            <Input placeholder="请输入代币名称" allowClear></Input>
          </div>
          <div className="inputOption mLeft12">
            <Input placeholder="请输入代币符号" allowClear></Input>
          </div>
        </div>
        <div className="cradOption">
          <div className="inputOption">
            <TextArea
              placeholder="请输入代币描述"
              allowClear
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            ></TextArea>
          </div>
        </div>

        <div className="cradOption">
          <div className="leftUploadImage">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或脱拽文件到此处上传</p>
              <p className="ant-upload-hint">上传代币图片</p>
            </Dragger>
          </div>
          <div className="rightMessage">
            <Input placeholder="Website" />
            <Input placeholder="Twitter" className="m12Block" />
            <Input placeholder="Telegram" />
          </div>
        </div>

        <div className="cradOption">
          <div className="inputOption">
            <Select
              style={{ width: "100%" }}
              placeholder="请选择Dev钱包"
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={pondList}
              optionRender={(option) => (
                <div>
                  <Tag color="processing">{option.data.address}</Tag>
                  <Tag color="success">余额:{option.data.balanceOf}</Tag>
                  <Tag color="magenta"> {option.data.label}</Tag>
                </div>
              )}
            />
          </div>
          <div className="inputOption mLeft12">
            <Input placeholder="买入金额(BNB)" allowClear></Input>
          </div>
        </div>

        <div className="cradOption">
          <div className="inputOption">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="请选择捆绑钱包"
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={bindList}
              optionRender={(option) => (
                <div>
                  <Tag color="processing">{option.data.address}</Tag>
                  <Tag color="success">余额:{option.data.balanceOf}</Tag>
                  <Tag color="magenta"> {option.data.label}</Tag>
                </div>
              )}
            />
          </div>
        </div>
        <div className="cradOption">
          <div className="leftOption">
            <div className="switchBox">
              <Switch
                defaultChecked
                checked={switchChecked}
                onChange={switchOnChange}
              />
              <div className="typeName">
                {switchChecked ? "智能分配" : "范围随机"}
              </div>
              <Tag color={switchChecked ? "processing" : "success"}>
                {switchChecked ? "智能不分配" : "范围随机"}
              </Tag>
            </div>
          </div>
          <div className="rightOption">
            {switchChecked ? (
              <div>
                <div className="inputOption mLeft12">
                  <Input placeholder="总买入金额(BNB)" />
                </div>
              </div>
            ) : (
              <div className="flexCenter">
                <div className="inputOption mLeft12">
                  <Input placeholder="最小捆绑金额(BNB)" />
                </div>
                <div className="inputOption mLeft12">
                  <Input placeholder="最大捆绑金额(BNB)" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="cradOption">
            <Button type="primary" className="btnBox">发射</Button>
        </div>
      </Card>
    </div>
  );
};
export default CreatFlap;
