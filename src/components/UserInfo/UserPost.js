import { connect } from "react-redux";
import React, { useState } from "react";
import { Button, Card, Form, Input, List, Modal, PageHeader, Tag } from "antd";
import withRouter from "./WithRouter";
import Loading from "../common/Loading";
import "./UserInfo.css";
import { getPost } from "../../redux/post-reducer";
import { MailOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "antd/lib/form/Form";
import { API } from "../../api";

const UserPost = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();

  const handleSubmit = async () => {
    if (
      Object.values(form.getFieldsValue()).filter((v) => v !== undefined)
        .length == 3
    ) {
      let responce = await API.makeComment(
        form.getFieldsValue(),
        props.post.id
      );

      setIsModalVisible(false);
    }
  };

  return (
    <>
      <PageHeader title={props.user.name}>
        <Tag color="#000000" icon={<MailOutlined />}>
          {props.user.email}
        </Tag>
      </PageHeader>
      <Card title={props.post.title} className="user_post">
        {props.post.body}
      </Card>
      <List
        header="Comments"
        className="comments"
        bordered
        dataSource={props.comments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="post_header">
                  <span>{item.name}</span>
                  <Tag color="#000000" icon={<MailOutlined />}>
                    {item.email}
                  </Tag>
                </div>
              }
              description={item.body}
            />
          </List.Item>
        )}
      />
      <Modal title="Add comment" visible={isModalVisible}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="text"
            label="Text"
            rules={[
              {
                required: true,
                message: "Please write your comment!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button className="add" onClick={() => setIsModalVisible(true)}>
        Add comment
      </Button>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    post: state.postPage.post,
    comments: state.postPage.comments,
    user: state.postPage.user,
  };
};

class UserPostComponent extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.router.params.postId);
  }

  render() {
    return this.props.post && this.props.comments && this.props.user ? (
      <UserPost
        post={this.props.post}
        comments={this.props.comments}
        user={this.props.user}
      />
    ) : (
      <Loading />
    );
  }
}

let UserPostContainer = connect(mapStateToProps, { getPost })(
  withRouter(UserPostComponent)
);

export default UserPostContainer;
