import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  // Add any other user-related state here
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    // Add other actions like logout, etc.
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
