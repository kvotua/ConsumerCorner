import { FieldValues } from "react-hook-form"
import { NavigateFunction } from "react-router-dom"

const token = localStorage.getItem("token")

export const onSubmit = async (
  data: FieldValues,
  addPoint: any,
  navigate: NavigateFunction,
) => {
  try {
    const res: any = await addPoint({
      token,
      body: {
        title: data.name,
        address: data.address,
        inn: data.ITN,
        ogrn: data.MSRN,
        phone: data.phone,
      },
    })
    if (res.error) {
      res.error.data.detail.map(({ msg }: { msg: string }) => {
        alert(msg)
      })
    } else {
      navigate(-1)
    }
  } catch {
    alert("что-то пошло не так")
  }
}
