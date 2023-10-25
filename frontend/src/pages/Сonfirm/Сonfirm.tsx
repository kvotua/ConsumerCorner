import { useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Button } from "../../shared/Buttons/Button/Button";
import { useAppSelector } from "../../hooks/useAppSelector";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setisEntrepreneur } from "../../store/Slices/isEntrepreneur";
import { useNavigate } from "react-router-dom";

const Сonfirm = () => {
  const [code, setCode] = useState("");
  const user = useAppSelector((state) => state.registerSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const postUser = () => {
    axios
      .post(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors?code=${code}`,
        {
          name: user.name,
          surname: user.surname,
          phone_number: "+" + user.phone,
        }
      )
      .then(({ data }) => {
        dispatch(setisEntrepreneur(true));
        localStorage.setItem("isEntrepreneur", JSON.stringify(true));
        localStorage.setItem("token", data);
        navigate("/points");
      });
  };

  return (
    <div className="container h-screen bg-main flex flex-col items-center justify-center gap-[10px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold">
        Подтверждение
      </h2>
      <AuthInput setValue={setCode} title="Код из смс" />

      <Button
        title="Подтвердить"
        type="submit"
        isActive
        handleClick={postUser}
      />
    </div>
  );
};

export { Сonfirm };
