import { useState } from "react";
import { Button } from "../../shared/Buttons/Button/Button";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setPhone } from "../../store/Slices/RegisterSlice";

const LogIn = () => {
  const [phone, setPhoneUser] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const getUser = () => {
    dispatch(setPhone(phone));
    axios
      .get(
        `http://77.232.137.4:8000/proprietors/verify/phone?phone_number=%2B${phone}`
      )
      .then(() => {
        navigation("/confirmLogin");
      })
      .catch(() => alert("Неправильно набран номер"));
  };
  return (
    <div className="container bg-main h-screen pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold">
        Вход
      </h2>
      <form className="flex flex-col gap-[10px] pt-[100px]">
        <AuthInput title="Телефон" setValue={setPhoneUser} />

        <Button
          isActive
          type="button"
          title="Отправить"
          handleClick={getUser}
        />

        <Link to={"/"}>
          <Button type="button" title="Назад" />
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
