import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setisEntrepreneur } from "../../store/Slices/isEntrepreneur";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Button } from "../../shared/Buttons/Button/Button";

const ConfirmLogin = () => {
  const [code, setCode] = useState("");
  const user = useAppSelector((state) => state.registerSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const postUser = () => {
    axios
      .get(
        `http://77.232.137.4:8000/proprietors/token?phone_number=%2B${user.phone}&code=${code}`
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

export default ConfirmLogin;
