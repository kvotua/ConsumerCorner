import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetComments } from "src/app/services/comments.service";
import { useGetPointById } from "src/app/services/points.service";
import { ReviewCard } from "src/entities/ReviewCard/ReviewCard";
import { ReviewCardSkeleton } from "src/entities/ReviewCard/ReviewCardSkeleton";
import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";

const Reviews: React.FC = () => {
  const { pointId } = useParams();
  //   const navigate = useNavigate();
  const { data: point } = useGetPointById(pointId!);
  const { data: comments, isLoading, isError } = useGetComments(pointId!);
  if (isError) {
    toast.error("Ошибка при получении комментариев");
  }
  return (
    <section className="wrapper">
      <h2 className="title">Отзывы</h2>
      <h3 className="text-center text-sm font-bold">{point?.title}</h3>

      {isLoading ? (
        <div className="flex flex-col gap-5">
          {[...Array(10)].map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      ) : comments && comments?.length > 0 ? (
        <div className="flex-grow flex flex-col gap-5 py-2">
          {comments.map(({ message, id }) => (
            <ReviewCard key={id} review={message} />
          ))}
        </div>
      ) : (
        <span className="flex-grow flex text-2xl font-bold items-center justify-center h-full">
          Нет отзывов
        </span>
      )}

      <div className="buttons">
        {/* <ButtonBase handleClick={() => navigate(`/point/${pointId}/book`)}>
          Написать отзыв
        </ButtonBase> */}
        <ButtonBack />
      </div>
    </section>
  );
};

export { Reviews };
