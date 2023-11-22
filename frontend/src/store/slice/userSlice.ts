import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    name: string,
    surname: string,
    login: string,
    password: string,
    id: string,
    points_id: string[],
    balance: number
    isAuth: boolean
    token: string
}
const initialState: IInitialState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    id: '',
    points_id: [],
    balance: 0,
    isAuth: false,
    token: ''
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            };
        },
        removeUser(state) {
            return{
                ...state = initialState
            }
        }
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
