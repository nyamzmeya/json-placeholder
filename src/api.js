import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const API = {
  getUsers() {
    return instance.get(`users`).then((responce) => {
      return responce.data;
    });
  },
  getPosts(id) {
    return instance.get(`/posts?userId=${id}`).then((responce) => {
      return responce.data;
    });
  },
  getUser(id) {
    return instance.get(`/users/${id}`).then((responce) => {
      return responce.data;
    });
  },
  getPost(id) {
    return instance.get(`/posts/${id}`).then((responce) => {
      return responce.data;
    });
  },
  getComments(id) {
    return instance.get(`/posts/${id}/comments`).then((responce) => {
      return responce.data;
    });
  },
  makeComment(body, postId) {
    return instance.put(`/posts/${postId}`, {
      body: body.text
  }).then((responce) => {
      return responce;
    });
  },
};
