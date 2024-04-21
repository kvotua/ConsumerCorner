import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { PointAddForm } from "./PointAddForm";
import { ProgressContext } from "src/app/providers/ProgressProvider";
import { useState } from "react";

const PointAdd: React.FC = () => {
  const [progressAddPoint, setProgressAddPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ProgressContext.Provider
      value={{
        progress: progressAddPoint,
        setProgress: setProgressAddPoint,
        isLoading,
        setIsLoading
      }}
    >
      <section className="wrapper">
        <h2 className="title">Добавить точку</h2>
        <PointAddForm />
        <div className="buttons">
          <div className="flex gap-2">
            {progressAddPoint !== 0 && (
              <ButtonBase
                handleClick={() => setProgressAddPoint((prev) => prev - 1)}
              >
                обратно
              </ButtonBase>
            )}
            <ButtonBase form="point" disabled={isLoading}>
              {isLoading ? (
                <img src="/loading.svg" className="w-6 mx-auto" />
              ) : progressAddPoint === 2 ? (
                "Создать точку"
              ) : (
                "Далее"
              )}
            </ButtonBase>
          </div>
          <ButtonBack />
        </div>
      </section>
    </ProgressContext.Provider>
  );
};

export { PointAdd };
