import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { PointEditForm } from "./PointEditForm";
import { ProgressContext } from "src/app/providers/ProgressProvider";
import { useState } from "react";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { ConfirmModal } from "src/widgets/СonfirmModal/СonfirmModal";
import { useDeletePoint } from "src/app/services/points.service";
import { useParams } from "react-router-dom";

const PointEdit: React.FC = () => {
  const [progressAddPoint, setProgressAddPoint] = useState(0);
  const { pointId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { mutate: deletePoint } = useDeletePoint();
  return (
    <section className="wrapper">
      {openModal && (
        <ConfirmModal
          title="Удалить точку ?"
          cancelButtonTitle="Отмена"
          successButtonTitle="Удалить"
          successButtonClass="!bg-textColor-error"
          cancelButtonClass="!rounded-left"
          cancelButtonClick={() => setOpenModal(false)}
          successButtonClick={() => deletePoint(pointId!)}
        />
      )}
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
            <ButtonBase
              handleClick={() => setOpenModal(true)}
              disabled={isLoading}
              className="bg-textColor-error text-white"
            >
              Удалить
            </ButtonBase>
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

export default PointEdit;
