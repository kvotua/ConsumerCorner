import { useState } from "react";

import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { RegisterForm } from "./RegisterForm";
import { useUserRedirect } from "src/app/hocs/useUserRedirect";
import { ProgressContext } from "src/app/providers/ProgressProvider";

const Register: React.FC = () => {
  useUserRedirect();
  const [progressAddPoint, setProgressAddPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className="wrapper">
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
              <img src="/loading.svg" className="w-6 mx-auto" />
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
};

export default Register;
