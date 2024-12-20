import { IUser } from "@/root/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: IUser | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser | null>) {
      state.user = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReduser = userSlice.reducer;
