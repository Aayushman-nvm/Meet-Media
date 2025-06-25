import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriend: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("Cant add as friends to non existing user.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = action.payload.post;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    },
  },
});

const authReducer = authSlice.reducer;

export const { setMode, setLogin, setLogout, setFriend, setPosts, setPost } =
  authSlice.actions;

export default authReducer;
