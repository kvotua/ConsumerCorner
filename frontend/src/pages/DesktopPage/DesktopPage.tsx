
import { QRCodeSVG } from "qrcode.react"

const DesktopPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center w-[max-content] mx-auto text-center">
      <QRCodeSVG
        value="http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai"
        size={300}
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
      <span className="block text-white font-bold text-[24px]">
        Сюда можно зайти только <br /> с мобильных устройств
      </span>
    </div>
  )
}

export { DesktopPage }
