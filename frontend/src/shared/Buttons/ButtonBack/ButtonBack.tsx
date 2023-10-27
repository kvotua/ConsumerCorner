import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-[10px] fixed w-full left-0 bottom-0 p-[10px] bg-main">
      <Button title="Назад" type="button" handleClick={() => navigate(-1)} />
    </div>
  );
};

export default ButtonBack;
