import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload.data === null) {
        state.user = null;
      } else {
        state.user = action.payload.data;
      }
    },
  },
});

export const { setUser } = userAuth.actions;

export default userAuth.reducer;
