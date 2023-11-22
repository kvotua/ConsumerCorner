import { useParams } from "react-router-dom"
import { useDownload } from "src/hooks/useDownload"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Title } from "src/ui/Title/Title"

const QR = () => {
  const { pointId } = useParams()

  return (
    <div>
      <Title title="QR-КОД" />
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
        <img
          src={`http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points/${pointId}/qr`}
          alt="qr-код"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
        <ButtonSubmit
          title="Скачать"
          type="button"
          isActive
          handlClick={() =>
            useDownload(
              "qr",
              `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points/${pointId}/qr`,
            )
          }
        />
        <ButtonBack />
      </div>
    </div>
  )
}

export { QR }
