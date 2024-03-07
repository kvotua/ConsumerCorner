import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosBase } from "src/axios"

interface IUser {
  name: string
  surname: string
  login: string
  password: string
  email: string
  id: string
  points_id: string[]
  balance: 0
  isAuth: boolean
}
const initialState: IUser = {
  name: "",
  surname: "",
  login: "",
  password: "",
  email: "",
  id: "",
  points_id: [],
  balance: 0,
  isAuth: false,
}

export const getUser = createAsyncThunk(
  "get/getUser",
  async (token: string) => {
    const { data } = await axiosBase.get(`proprietors/by/token?token=${token}`)
    return data
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    removeUser() {
      return {
        ...initialState,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (_, { payload }) => {
        return {
          ...payload,
          isAuth: true,
        }
      })
      .addCase(getUser.rejected, (state) => {
        return {
          ...state,
          isAuth: true,
        }
      })
  },
})

export const { removeUser, setUser } = userSlice.actions
export default userSlice.reducer
