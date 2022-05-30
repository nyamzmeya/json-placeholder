import { API } from "../api";

let initialState = {
  users: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-USERS":
      return { ...state, users: action.users };

    default:
      return state;
  }
};

const setUsers = (users) => {
  return {
    type: "SET-USERS",
    users,
  };
};

export const getUsers = () => async (dispatch) => {
  let data = await API.getUsers();
  dispatch(setUsers(data));
};

export default usersReducer;
