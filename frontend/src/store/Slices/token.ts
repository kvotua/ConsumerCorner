import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  token: string;

}
const initialState: IinitialState = {
  token: "",

};
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
