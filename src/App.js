import React from "react";
import store from "./redux/redux-store";
import 'antd/dist/antd.css';
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import UsersContainer from "./components/Users/Users.js";
import { Header } from "antd/lib/layout/layout";
import {Content} from "antd/lib/layout/layout";
import UserContainer from "./components/UserInfo/UserInfo";
import UserPostsContainer from "./components/UserInfo/UserPosts";
import UserPostContainer from "./components/UserInfo/UserPost";


class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="app">
        <Header className="header">Users app</Header>
        <Content>
          <Routes>
            <Route path="/" element={<UsersContainer />} />
            <Route path="/user/:id" element={<UserContainer />} />
            <Route path="/user/:id/posts" element={<UserPostsContainer />} />
            <Route path="/user/:id/posts/:postId" element={<UserPostContainer />} />
          </Routes>
        </Content>
      </div>
    );
  }
}

let MainApp = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
