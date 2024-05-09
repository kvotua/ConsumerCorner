"use client";
import Image from "next/image";
import { Cookies } from "react-cookie";
import dynamic from "next/dynamic";

import profileIcon from "@/root/assets/profile.svg";
import { useAppDispatch } from "@/root/hooks/useAppDispatch";
import { useBalance, useGetUser } from "@/root/services/user";
import { setUser } from "@/root/store/slices/userSlice";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { InfoField } from "@/shared/InfoField/InfoField";
import { useCookies } from "react-cookie";

function Profile() {
  const dispatch = useAppDispatch();
  const { data: user } = useGetUser();
  const { mutate } = useBalance();
  const alert = () => {
    const price = prompt("Пополнить баланс:");
    if (price && user) {
      mutate({ token: user.id, price: +price * 100 });
    }
  };
  const [{}, _, removeCookie] = useCookies();
  return (
    <section className="wrapper container">
      <div className="flex flex-col justify-center items-center">
        <div className="w-20 h-20 rounded-full">
          <Image src={profileIcon} alt="profile" />
        </div>
        {/* <span className="text-2xl pt-2">{user?.name}</span> */}
      </div>
      <div className="flex-grow flex flex-col gap-8 py-5">
        <InfoField info={`${user?.login}`} titleInfo="Логин" />
        <InfoField info={`${user?.name} ${user?.surname}`} titleInfo="ФИО" />
        <InfoField info={`${user?.email}`} titleInfo="Эл. почта" />
        <div className="flex justify-between items-center">
          <InfoField
            info={`${(user && user?.balance / 100) || "0"} р.`}
            titleInfo="Баланс"
          />
          <span className="font-bold" onClick={alert}>
            Пополнить
          </span>
        </div>
      </div>
      <div className="buttons">
        <div className="flex gap-2">
          <ButtonBase
            handleClick={() => {
              dispatch(setUser(null));
              removeCookie("token");
              console.log(123);
            }}
          >
            Выйти
          </ButtonBase>
          <ButtonBase link={`${user?.id}/edit`}>Изменить</ButtonBase>
        </div>
        <ButtonBack />
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(Profile), {
  ssr: false,
});
