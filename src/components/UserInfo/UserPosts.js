import { connect } from "react-redux";
import React from "react";
import { Button, Card, List, PageHeader } from "antd";
import withRouter from "./WithRouter";
import { getUserPosts } from "../../redux/user-reducer";
import { API } from "../../api";
import Loading from "../common/Loading";
import "./UserInfo.css";
import { Link } from "react-router-dom";

const UserPosts = (props) => {

  
  return (
    <> 
      <List
      className="posts posts_show"
      header={`Posts of ${props.user.name}`}
      bordered
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

class UserPostsComponent extends React.Component {
  async componentDidMount() {
    if (!this.props.user) {
      let user = await API.getUser(this.props.router.params.id);
      this.props.getUserPosts(user, user.id);
    }
  }

  render() {
    return this.props.user && this.props.posts ? <UserPosts user={this.props.user} posts={this.props.posts}/> : <Loading />;
  }
}

let UserPostsContainer = connect(mapStateToProps, { getUserPosts })(
  withRouter(UserPostsComponent)
);

export default UserPostsContainer;