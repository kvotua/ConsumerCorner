import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  isEntrepreneur: boolean
}
const initialState: IinitialState = {
  isEntrepreneur: false
};
const isEntrepreneurSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setisEntrepreneur(state, action: PayloadAction<boolean>) {
      state.isEntrepreneur = action.payload;
    },
  },
});

export const { setisEntrepreneur } = isEntrepreneurSlice.actions;
export default isEntrepreneurSlice.reducer;
