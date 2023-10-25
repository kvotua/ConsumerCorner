import QRCode from "react-qr-code";

const QRPage = () => {
    return (
        <div className='container bg-main h-screen flex items-center justify-center'>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={"http://192.168.0.8:5173/"}
                viewBox={`0 0 256 256`}
                bgColor="none"
            />
        </div>
    );
};

export default QRPage;
