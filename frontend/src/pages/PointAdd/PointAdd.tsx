import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetPointData } from "src/app/providers/PointDataProvider";
import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";

const PointAdd: React.FC = () => {
  const step = useParams();
  const { clearValues } = useGetPointData();
  const navigate = useNavigate();
  return (
    <section className="wrapper">
      <h2 className="title">Создать точку</h2>
      <div className="flex-grow py-5 flex items-center">
        <Outlet />
      </div>
      <div className="buttons">
        <div className="flex gap-2">
          {+step["*"]! !== 1 && (
            <ButtonBase handleClick={() => navigate(-1)} className="next">
              обратно
            </ButtonBase>
          )}
          <ButtonBase form="point" className="next">
            {+step["*"]! === 3 ? "Создать" : "Далее"}
          </ButtonBase>
        </div>
        <ButtonBack handleClick={() => clearValues()} link="/points" />
      </div>
    </section>
  );
};

export default PointAdd ;
