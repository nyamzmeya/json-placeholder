import { connect } from "react-redux";
import React from "react";
import { Button, Card, List, PageHeader } from "antd";
import withRouter from "./WithRouter";
import { getUserPosts } from "../../redux/user-reducer";
import { API } from "../../api";
import Loading from "../common/Loading";
import "./UserInfo.css";
import { Link } from "react-router-dom";

const UserInfo = (props) => {

  
  return (
    <>
      <PageHeader title={`Profile of ${props.user.name}`} />
      <Card title={props.user.username} className="user_info">
        <p>{props.user.name}</p>
        <p>{props.user.address.city}</p>
        <p>{props.user.email}</p>
        <p>{props.user.phone}</p>
        <p>{props.user.website}</p>
        <p>
          <b>{props.user.company.name}</b> "{props.user.company.bs}"
        </p>
      </Card>

      
      <List
      className="posts"
      header={`Posts of ${props.user.name}`}
      bordered
      footer={props.posts.length > 3 ? <Button className="user_button"><Link to={`/user/${props.user.id}/posts`}>All posts</Link></Button> : ""}
      dataSource={props.posts}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={item.title} description={`${item.body.split("\n")[0]}...`}/>
          <Button><Link to={`/user/${props.user.id}/posts/${item.id}`}>Read post</Link></Button>
        </List.Item>
      )}
    />
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    user: state.userPage.user,
    posts: state.userPage.user_posts,
  };
};

class UserInfoComponent extends React.Component {
  async componentDidMount() {
    if (!this.props.user) {
      let user = await API.getUser(this.props.router.params.id);
      this.props.getUserPosts(user, user.id);
    }
  }

  render() {
    return this.props.user && this.props.posts ? <UserInfo user={this.props.user} posts={this.props.posts}/> : <Loading />;
  }
}

let UserContainer = connect(mapStateToProps, { getUserPosts })(
  withRouter(UserInfoComponent)
);

export default UserContainer;
