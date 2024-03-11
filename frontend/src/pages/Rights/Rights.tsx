import { useEffect } from "react"
import { axiosBase } from "src/axios"
import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Rights = () => {
  const point = useAppSelector((state) => state.pointSlice)
  useEffect(() => {
    axiosBase.get(``).then(({ data }) => {
      console.log(data)
    })
  }, [])


  return (
    <div className="flex flex-col h-full container pt-8">
      <TitlePoint title="Права покупателя" pointName={point.title} />
      <div className="flex-grow py-4">
        <iframe
          className="w-full h-full"
          src={`http://localhost:8000/files/a90d7c40-8d42-4d1b-bfba-7b10645ee6a6`}
        ></iframe>
      </div>
      <div className="pb-4 flex flex-col gap-[10px]">
        <ButtonSubmit title="Скачать документ PDF" type="button" isActive />
        <ButtonBack />
      </div>
    </div>
  )
}

export { Rights }
