import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  name: string;
  surname: string;
  phone: string;
}
const initialState: IinitialState = {
  name: "",
  surname: "",
  phone: "",
};
const regisrtSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
  },
});

export const { setName, setSurname, setPhone } = regisrtSlice.actions;
export default regisrtSlice.reducer;
