import { useParams } from "react-router-dom";
import { ButtonEntrepreneur } from "../../shared/Buttons/ButtonEntrepreneur/ButtonEntrepreneur";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";

const Comments = () => {
  const { id } = useParams();
  return (
    <div className="container bg-main pt-[100px] h-screen">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Жалобы и предложения
      </h2>

      <div className="flex gap-[10px]  w-full left-0 bottom-0 p-[10px] bg-main">
        <ButtonEntrepreneur title="Жалоба" link={`/points/${id}/report`} />
        <ButtonEntrepreneur
          title="Предложение"
          link={`/points/${id}/Proposal`}
        />
      </div>
      <ButtonBack />
    </div>
  );
};

export default Comments;
