import { API } from "../api";

let initialState = {
    user: null,
  post: null,
  comments: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-POST":
      return { ...state, post: action.post };
    case "SET-COMMENTS":
      return { ...state, comments: action.comments };
      case "SET-USER":
        return { ...state, user: action.user };
    default:
      return state;
  }
};

const setPost = (post) => {
  return {
    type: "SET-POST",
    post,
  };
};

const setComments = (comments) => {
  return {
    type: "SET-COMMENTS",
    comments,
  };
};

const setUser = (user) => {
    return {
      type: "SET-USER",
      user,
    };
  };


export const getPost = (id) => async (dispatch) => {
  let post = await API.getPost(id);
  dispatch(setPost(post));
  let comments = await API.getComments(id);
  dispatch(setComments(comments));
  let user = await API.getUser(post.userId);
  dispatch(setUser(user));
};

export default postReducer;
