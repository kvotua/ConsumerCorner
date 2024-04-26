import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";

const Rights: React.FC = () => {
  return (
    <section className="wrapper">
      <div className="flex-grow ">
        <iframe
          src="https://fguz44.ru/wp-content/uploads/2017/11/%D0%97%D0%B0%D1%89%D0%B8%D1%82%D0%B0_%D0%BF%D1%80%D0%B0%D0%B2_%D0%BF%D0%BE%D1%82%D1%80%D0%B5%D0%B1%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9._%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5_%D0%BF%D0%BE%D0%BD%D1%8F%D1%82%D0%B8%D1%8F_%D0%B8_%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%B0%D0%B2%D0%B0_%D0%BF%D0%BE%D1%82%D1%80%D0%B5%D0%B1%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9.pdf"
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
      <div className="buttons !backdrop-blur-none">
        <ButtonBack className="bg-fillColor" />
      </div>
    </section>
  );
};

export default Rights;
