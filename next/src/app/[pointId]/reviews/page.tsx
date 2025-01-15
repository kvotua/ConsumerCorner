"use client";
import { ReviewCard } from "@/entities/ReviewCard/ReviewCard";
import { ReviewCardSkeleton } from "@/entities/ReviewCard/ReviewCardSkeleton";
import { useGetComments } from "@/root/services/comments";
import { useGetPointById } from "@/root/services/points";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Reviews() {
  const { pointId } = useParams();
  //   const navigate = useNavigate();
  const { data: point } = useGetPointById(pointId as string);
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetComments(pointId as string);
  if (isError) {
    toast.error("Ошибка при получении комментариев");
  }
  return (
    <section className="wrapper container">
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
}
