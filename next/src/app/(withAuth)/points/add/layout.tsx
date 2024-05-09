"use client";
import { useGetPointData } from "@/root/providers/PointDataProvider";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { useParams, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function AddLayout({ children }: PropsWithChildren<unknown>) {
  //   const step = useParams();
  const { clearValues } = useGetPointData();
  //   const navigate = useNavigate();
  const { step } = useParams();
  const { back } = useRouter();
  return (
    <section className="wrapper container">
      <h2 className="title">Создать точку</h2>
      <div className="flex-grow py-5 flex items-center">{children}</div>
      <div className="buttons">
        <div className="flex gap-2">
          {+step !== 1 && (
            <ButtonBase handleClick={() => back()} className="next">
              обратно
            </ButtonBase>
          )}
          <ButtonBase form="point" className="next">
            {+step === 3 ? "Создать" : "Далее"}
          </ButtonBase>
        </div>
        <ButtonBack handleClick={() => clearValues()} link="/points" />
      </div>
    </section>
  );
}
