import React from "react";
import { Row, Col, Form, Input, Button, Upload } from "antd";
import { useNavigate } from 'react-router-dom';
import { MainLayout } from "../../components/Layout";
import { InboxOutlined } from "@ant-design/icons";
import request from '../../api/request';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const customRequest = ({
  file,
  onError,
  onSuccess,
}) => {
  const formData = new FormData();
  formData.append("file", file);

  request
    .post('/upload', formData)
    .then(({ data: response }) => {
      onSuccess(response, file);
    })
    .catch(onError);

  return {
    abort() {
      console.log('upload progress is aborted.');
    },
  };
}

export default function CreatePost() {
  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { title, description, images } = values;
    const imageUrl = images[0].response;

    try {
      setStatus("loading");
      const res = await request({
        url: '/posts',
        method: 'POST',
        data: {
          title,
          description,
          imageUrl
        }
      });
      if (res.success) {
        navigate("/")
      }
    } catch (err) {

    }
  }

  const isLoading = status === "loading";

  return (
    <MainLayout>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item label="Images">
              <Form.Item
                name="images"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger 
                  name="files" 
                  customRequest={customRequest}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </MainLayout>
  );
}
