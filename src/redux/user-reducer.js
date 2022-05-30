import { API } from "../api";

let initialState = {
  user: null,

  user_posts: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-USER":
      return { ...state, user: action.user };
    case "SET-USER-POSTS":
      return { ...state, user_posts: action.user_posts };

    default:
      return state;
  }
};
const setUser = (user) => {
  return {
    type: "SET-USER",
    user,
  };
};

const setUserPosts = (user_posts) => {
  return {
    type: "SET-USER-POSTS",
    user_posts,
  };
};

export const getUserPosts = (user, id) => async (dispatch) => {
  dispatch(setUser(user));
  let data = await API.getPosts(id);
  dispatch(setUserPosts(data));
};

export default userReducer;
