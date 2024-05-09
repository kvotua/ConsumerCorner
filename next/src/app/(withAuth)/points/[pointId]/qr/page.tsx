"use client";
import { useGetPointById } from "@/root/services/points";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { saveSvgAsPng } from "save-svg-as-png";

export default function Qr() {
  const { pointId } = useParams();
  const { data: point } = useGetPointById(pointId as string);
  const downloadQr = () => {
    saveSvgAsPng(
      document.getElementById("qr-svg") as HTMLElement,
      `Цифрофой-уголок-${point?.title}.png`,
      {
        scale: 5,
      }
    );
  };

  return (
    <section className="wrapper container">
      <h2 className="title">qr-код</h2>

      <div className="flex-grow flex justify-center items-center">
        <QRCodeSVG
          value={`${process.env.NEXT_PUBLIC_CLIENT_URL}/points/${pointId}`}
          size={300}
          id="qr-svg"
          includeMargin
          className="rounded-[20px]"
          level="Q"
          imageSettings={{
            src: "/miniLogo.svg",
            x: undefined,
            y: undefined,
            height: 60,
            width: 60,
            excavate: true,
          }}
        />
      </div>
      <div className="buttons">
        <ButtonBase handleClick={downloadQr}>Скачать qr-код</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
}
