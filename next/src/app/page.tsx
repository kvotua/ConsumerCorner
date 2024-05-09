"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

import LogoIcon from "@/root/assets/noBgLogo.svg";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";

export default function Home() {
  const { push } = useRouter();
  const [{ token }] = useCookies();
  useEffect(() => {
    if (token) {
      push("/points");
    }
  }, [token]);
  return (
    <main className="container wrapper justify-center items-center gap-5">
      {/* <h2 className="title">Добро пожаловать!</h2> */}
      <div className="flex-grow w-full flex flex-col justify-center gap-5">
        <Image
          src={LogoIcon}
          alt="logo"
          className="mx-auto mb-20"
          priority={true}
        />
        <ButtonBase link="/login">Войти</ButtonBase>
        <ButtonBase link="/register" isActive={false}>
          Зарегестрироваться
        </ButtonBase>
      </div>
      <p className="text-center opacity-50 text-sm">
        Удобные и нужные инструменты позволяющие вашему бизнесу быть в курсе и
        оперативно реагировать на пожелания клиента
      </p>
    </main>
  );
}
