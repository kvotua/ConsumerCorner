import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IPoint {
  title: string
  address: string
  inn: string
  ogrn: string
  id: string
  owner: string
  audit_log_file_id: string
  license_file_ids: string[]
  accreditation_file_ids: string[]
}

const initialState: IPoint = {
  title: "",
  address: "",
  inn: "",
  ogrn: "",
  id: "",
  owner: "",
  audit_log_file_id: "",
  license_file_ids: [],
  accreditation_file_ids: [],
}
const pointSlice = createSlice({
  name: "point",
  initialState,
  reducers: {
    setPoint(_, { payload }: PayloadAction<IPoint>) {
      return {
        ...payload,
      }
    },
  },
})

export const { setPoint } = pointSlice.actions
export default pointSlice.reducer
