import QRCode from "react-qr-code";

const QRPage = () => {
    return (
        <div className='container bg-main h-screen flex items-center justify-center'>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={"http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:5173/"}
                viewBox={`0 0 256 256`}
                bgColor="none"
            />
        </div>
    );
};

export default QRPage;
