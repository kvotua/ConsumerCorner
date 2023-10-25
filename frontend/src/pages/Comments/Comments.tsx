import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../shared/Buttons/Button/Button";

interface IComments {
  pointID: string;
  message: string;
  id: string;
}
const Comments = () => {
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
    <div className="container bg-main pt-[100px] h-screen">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Жалобы и предложения
      </h2>
      <div className="h-[400px] overflow-scroll">
        {comments.map((comment) => (
          <p className="w-full block break-words bg-originWhite p-[20px] rounded-[10px] mb-10">
            {comment.message}
          </p>
        ))}
      </div>
      <div className="flex gap-[10px] fixed w-full left-0 bottom-0 p-[10px] bg-main">
        <Button title="Жалоба" type="button" link={`/points/${id}/report`} />
        <Button
          title="Предложение"
          type="button"
          isActive
          link={`/points/${id}/Proposal`}
        />
      </div>
    </div>
  );
};

export default Comments;
