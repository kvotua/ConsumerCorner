import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";

interface IComments {
  pointID: string;
  message: string;
  id: string;
}

const Reviews = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [comments, setComments] = useState<IComments[]>([]);

  const getComments = () => {
    axios
      .get(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/comments/by/pointID?token=${token}&pointID=${id}`
      )
      .then(({ data }) => setComments(data));
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="container bg-main pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Отзывы
      </h2>
      <div className="h-[400px] overflow-scroll rounded-[10px]">
        {comments.map((comment) => (
          <p className="w-full block break-words bg-originWhite p-[20px] rounded-[10px] mb-10">
            {comment.message}
          </p>
        ))}
      </div>
      <ButtonBack />
    </div>
  );
};

export default Reviews;
