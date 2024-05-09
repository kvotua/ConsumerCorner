'use client'
import { ProgressContext } from "@/root/providers/ProgressProvider";
import { useDeletePoint } from "@/root/services/points";
import { ConfirmModal } from "@/widgets/СonfirmModal/СonfirmModal";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PointEditForm } from "./PointEditForm";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";

export default function Edit() {
    const [progressAddPoint, setProgressAddPoint] = useState(0);
    const { pointId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { mutate: deletePoint } = useDeletePoint();
    return (
      <section className="wrapper container">
        {openModal && (
          <ConfirmModal
            title="Удалить точку ?"
            cancelButtonTitle="Отмена"
            successButtonTitle="Удалить"
            successButtonClass="!bg-textColor-error"
            cancelButtonClass="!rounded-left"
            cancelButtonClick={() => setOpenModal(false)}
            successButtonClick={() => deletePoint(pointId as string)}
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
}
