import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../../shared/Buttons/Button/Button";

interface IUser {
  name: string;
  surname: string;
  phone_number: string;
  id: string;
  points_id: string[];
}
const EntrepreneurProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const token = localStorage.getItem("token");
  const getUser = () => {
    axios
      .get(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors/by/token?token=${token}`
      )
      .then(({ data }) => setUser(data));
  };
  useEffect(() => {
    getUser();
  }, []);
  const phone = user?.phone_number.slice(5);
  return (
    <div className="container h-screen pt-[100px]">
      <span className="block text-center text-originWhite text-[30px] font-bold mb-2">
        {`${user?.name} ${user?.surname}` || "Фамилия Имя"}
      </span>
      <span className="block text-center text-originWhite text-[16px]  font-bold mb-40">
        {phone}
      </span>
      <div className="flex gap-[10px] fixed w-full left-0 bottom-0 p-[10px]">
        <Button title="Редактировать" isActive type="button" link="edit" />
        <Button title="Назад" type="button" link="/" />
      </div>
    </div>
  );
};

export { EntrepreneurProfile };
