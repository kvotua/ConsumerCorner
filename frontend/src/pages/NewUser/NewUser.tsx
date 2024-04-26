
import { Cookies } from "react-cookie";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";

const NewUser: React.FC = () => {
  return (
    <main className="container wrapper !pt-20">
      <img src="/noBgLogo.svg" alt="" />
      <div className="flex-grow"></div>
      <div className="buttons">
        <ButtonBase handleClick={() => new Cookies().set("visited", true)}>
          Начать
        </ButtonBase>
      </div>
    </main>
  );
};

export { NewUser };
