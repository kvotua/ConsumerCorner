import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { PointEditForm } from "./PointEditForm";
import { ProgressContext } from "src/app/providers/ProgressProvider";
import { useState } from "react";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";

const PointEdit: React.FC = () => {
  const [progressAddPoint, setProgressAddPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className="wrapper">
      <ProgressContext.Provider
        value={{
          progress: progressAddPoint,
          setProgress: setProgressAddPoint,
          isLoading,
          setIsLoading,
        }}
      >
        <h2 className="title">Редактировать точку</h2>
        <PointEditForm />
        <div className="buttons">
          <div className="flex gap-2">
            <ButtonBase form="editPoint" disabled={isLoading}>
              Обновить
            </ButtonBase>
          </div>
          <ButtonBack />
        </div>
      </ProgressContext.Provider>
    </section>
  );
};

export { PointEdit };
