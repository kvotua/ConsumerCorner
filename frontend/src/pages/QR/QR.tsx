import { useParams } from "react-router-dom"
import { QRCodeSVG } from "qrcode.react"

import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Title } from "src/ui/Title/Title"
import { saveSvgAsPng } from "save-svg-as-png"
import { useAppSelector } from "src/hooks/useAppSelector"

const QR = () => {
  const { pointId } = useParams()
  const point = useAppSelector((state) => state.pointSlice)
  const downloadQr = () => {
    saveSvgAsPng(document.getElementById("qr-svg"), `qr(${point.title}).png`, {
      scale: 5,
    })
  }
  return (
    <div className="container pt-8">
      <Title title="QR-КОД" />
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full ">
        <div className="p-4 bg-white rounded-[20px]">
          {/* <img
            src={`http://localhost:8000/points/${pointId}/qr`}
            alt="qr-код"
          /> */}
          <QRCodeSVG
            value={`http://localhost:8000/points/${pointId}/qr`}
            size={300}
            id="qr-svg"
            includeMargin
            className="rounded-[20px]"
            level="Q"
            imageSettings={{
              src: "/miniLogo.svg",
              x: undefined,
              y: undefined,
              height: 80,
              width: 80,
              excavate: true,
            }}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] pb-4">
        <ButtonSubmit
          title="Скачать"
          type="button"
          isActive
          handlClick={() => downloadQr()}
        />
        <ButtonBack />
      </div>
    </div>
  )
}

export { QR }
