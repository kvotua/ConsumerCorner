import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    title: string,
    address: string,
    inn: string,
    ogrn: string,
    id: string,
    owner: string
}
const initialState: IInitialState = {
    title: '',
    address: '',
    inn: '',
    ogrn: '',
    id: '',
    owner: ''
};
const pointSlice = createSlice({
    name: "point",
    initialState,
    reducers: {
        setPoint(state, action: PayloadAction<any>) {
            return {
                ...state,
                ...action.payload
            }
        },

    },
});

export const { setPoint } = pointSlice.actions;
export default pointSlice.reducer;
