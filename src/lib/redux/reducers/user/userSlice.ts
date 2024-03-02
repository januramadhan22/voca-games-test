import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (thunkApi) => {
    const response = await fetch("/api/auth/me");
    const data = response.json();
    return data;
  }
);

const initialState = {
  userData: null,
  isAuthorized: false,
} as any;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const { setUserData, setAuthorized } = userSlice.actions;
export default userSlice.reducer;
