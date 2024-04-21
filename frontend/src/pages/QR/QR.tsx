import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { saveSvgAsPng } from "save-svg-as-png";

import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { useGetPointById } from "src/app/services/points.service";
import { Suspense } from "react";

const QR: React.FC = () => {
  const { pointId } = useParams();
  const { data: point } = useGetPointById(pointId!);
  const downloadQr = () => {
    saveSvgAsPng(
      document.getElementById("qr-svg"),
      `Цифрофой-уголок-${point?.title}.png`,
      {
        scale: 5,
      }
    );
  };

  return (
    <section className="wrapper">
      <h2 className="title">qr-код</h2>

      <div className="flex-grow flex justify-center items-center">
        <Suspense fallback={<>Loading...</>}>
          <QRCodeSVG
            value={`${import.meta.env.VITE_CLIENT_URL}/point/${pointId}`}
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
        </Suspense>
      </div>
      <div className="buttons">
        <ButtonBase handleClick={downloadQr}>Скачать qr-код</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
};

export { QR };
