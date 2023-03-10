import React, { useContext, useState } from "react";
import { Form, Input, Button, Upload, message, Row, Col } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RealmContext } from "../context/realmProvider";
import ShortUniqueId from "short-unique-id";
import { insertCard } from "../redux/cardsSlice";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";

const uid = new ShortUniqueId({
  dictionary: "alphanum_lower",
  length: 5,
});
const FormItem = Form.Item;

const handleCropImg = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const AddProfile = () => {
  const { mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [short] = useState(uid());
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    handleUpload(file);
    return false;
  };

  const handleUpload = (file) => {
    uploadBytes(ref(storage, `/images/${short}/avatar.png`), file).then(
      (snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          form.setFieldValue("avatar", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleFinish = (values) => {
    setLoading(true);
    console.log("values:", values);
    dispatch(
      insertCard({
        mongo,
        user,
        entity: {
          short,
          ...values,
        },
      })
    );
    setLoading(false);
    navigate("/");
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#f5f5f5] py-[50px]">
      <div className="max-w-[700px] mx-auto p-[30px] rounded-md bg-white shadow-lg">
        <h2 className="mb-[30px]">T???o H??? S?? M???i</h2>
        <Form
          layout="vertical"
          form={form}
          name="my-form"
          onFinish={handleFinish}
        >
          <Form.Item className="hidden" name="avatar">
            <Input hidden />
          </Form.Item>
          <FormItem label="Upload Avatar">
            <ImgCrop rotate>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onPreview={handleCropImg}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ImgCrop>
          </FormItem>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item
                name="name"
                label="H??? v?? t??n"
                rules={[
                  {
                    required: true,
                    message: "L??m ??n nh???p h??? v?? t??n!",
                  },
                ]}
              >
                <Input placeholder="Nh???p H??? v?? T??n" />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "L??m ??n nh???p S??T!",
                  },
                ]}
              >
                <Input placeholder="Nh???p S??T" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item
                name="company"
                label="C??ng ty"
                rules={[
                  {
                    required: true,
                    message: "L??m ??n nh???p t??n c??ng ty!",
                  },
                ]}
              >
                <Input placeholder="Nh???p t??n c??ng ty" />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item
                name="position"
                label="Ch???c v???"
                rules={[
                  {
                    required: true,
                    message: "L??m ??n nh???p ch???c v???!",
                  },
                ]}
              >
                <Input placeholder="Nh???p ch???c v???" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="?????a ch???"
            rules={[
              {
                required: true,
                message: "L??m ??n nh???p ?????a ch???!",
              },
            ]}
          >
            <Input placeholder="Nh???p ?????a ch???" />
          </Form.Item>

          {/* <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input placeholder="Enter your title" />
            </Form.Item> */}

          {/* <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter your description" />
            </Form.Item> */}

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="gmail" label="Email">
                <Input placeholder="Nh???p ?????a ch??? Email" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="facebook" label="Facebook">
                <Input placeholder="Nh???p link Facebook" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="zalo" label="Zalo">
                <Input placeholder="Nh???p s??? Zalo" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="viber" label="Viber">
                <Input placeholder="Nh???p s??? Viber" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="services" label="Services Link">
                <Input placeholder="Nh???p link c???a b???n" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="caseStudy" label="Case Study Link">
                <Input placeholder="Nh???p link c???a b???n" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="brochure" label="Brochure Link">
                <Input placeholder="Nh???p link c???a b???n" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={loading}>
            Save Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProfile;
