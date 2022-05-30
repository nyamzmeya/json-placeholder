import { connect } from "react-redux";
import User from "./User";
import { getUsers } from "../../redux/users-reducer";
import { getUserPosts } from "../../redux/user-reducer";
import React from "react";
import Loading from "../common/Loading";
import "./Users.css";
import { PageHeader } from "antd";

const Users = (props) => {
  let UserEl = props.users.map((p) => <User user={p} setUser={props.setUser}/>);
  return (
    <>
      <PageHeader
        title="Users"
      />
      <div className="users">{UserEl}</div>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
  };
};

class UsersComponent extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return this.props.users ? <Users users={this.props.users} setUser={this.props.getUserPosts}/> : <Loading />;
  }
}

let UsersContainer = connect(mapStateToProps, { getUsers, getUserPosts })(UsersComponent);

export default UsersContainer;
