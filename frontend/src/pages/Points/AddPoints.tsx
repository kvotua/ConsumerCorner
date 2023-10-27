import { useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Button } from "../../shared/Buttons/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";

const AddPoints = () => {
  const [title, setTilte] = useState("");
  const [addres, setAddres] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const postPoints = () => {
    axios
      .post(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points?token=${token}`,
        {
          title: title,
          address: addres,
        }
      )
      .then(() => navigate("/points"));
  };
  return (
    <div className="container bg-main h-screen pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Добавить точку
      </h2>
      <form className="flex flex-col gap-[10px]">
        <AuthInput setValue={setTilte} title="Назавание точки" value={title} />
        <AuthInput setValue={setAddres} title="Адрес точки" value={addres} />


          <Button
            title="Добавить"
            type="button"
            isActive
            handleClick={postPoints}
          />

      </form>
      <ButtonBack />
    </div>
  );
};

export default AddPoints;
