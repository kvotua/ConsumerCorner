"use client";
import { useState } from "react";
import Image from "next/image";

import loaderIcon from "@/root/assets/loading.svg";
import { ProgressContext } from "@/root/providers/ProgressProvider";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { RegisterForm } from "./registerForm";

export default function Register() {
  const [progressAddPoint, setProgressAddPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className="wrapper container">
      <h2 className="title">Регистрация</h2>
      <ProgressContext.Provider
        value={{
          progress: progressAddPoint,
          setProgress: setProgressAddPoint,
          isLoading,
          setIsLoading,
        }}
      >
        <RegisterForm />
      </ProgressContext.Provider>
      <div className="buttons">
        <div className="flex gap-2">
          {progressAddPoint !== 0 && (
            <ButtonBase
              handleClick={() => setProgressAddPoint((prev) => prev - 1)}
            >
              обратно
            </ButtonBase>
          )}
          <ButtonBase form="register">
            {isLoading ? (
              <Image src={loaderIcon} className="w-6 mx-auto" alt="loading" />
            ) : progressAddPoint === 1 ? (
              "Зарегистрироваться"
            ) : (
              "Далее"
            )}
          </ButtonBase>
        </div>
        <ButtonBack />
      </div>
    </section>
  );
}
