"use client";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { useRouter } from "next/navigation";

export default function Thanks() {
  const { push } = useRouter();
  return (
    <section className="wrapper container">
      <div className="flex-grow flex flex-col items-center justify-center gap-5">
        <span className="font-bold text-3xl text-center">
          Спасибо за Ваш отзыв!
        </span>
        <p className="text-center text-lg">
          Мы учтем Ваши слова при нашей дальнейшей работе и будем стараться
          становиться лучше!
        </p>
      </div>
      <div className="buttons">
        <ButtonBase handleClick={() => push("/")}>На главную</ButtonBase>
      </div>
    </section>
  );
}
