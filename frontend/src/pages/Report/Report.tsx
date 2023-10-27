import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/Buttons/Button/Button";
import axios from "axios";
import { useState } from "react";
import loader from "../../assets/Pulse.svg";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";

const Report = () => {
  const { id } = useParams();
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();
  const postComment = () => {
    setIsLoading(true);
    axios
      .post(
        "http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/comments",
        {
          pointID: id,
          message: comment,
        }
      )
      .then(() => {
        setIsLoading(false);
        navigation("/thanks");
      });
  };
  if (isLoading) {
    return (
      <div className="container h-screen flex items-center justify-center">
        <img src={loader} alt="" />
      </div>
    );
  }
  return (
    <div className="container bg-main pt-[100px]">
      <div className="">
        <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
          Жалоба
        </h2>
        <form>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-inherit border rounded-[20px] w-full p-[20px] resize-none text-originWhite font-medium outline-none"
          ></textarea>
          <Button
            title="Отправить"
            type="submit"
            isActive
            handleClick={postComment}
          />
        </form>
      </div>
      <ButtonBack />
    </div>
  );
};

export default Report;
