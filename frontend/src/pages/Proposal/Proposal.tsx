import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/Buttons/Button/Button";

const Proposal = () => {
  const { id } = useParams();
  const [comment, setComment] = useState<string>("");
  const navigation = useNavigate();
  const postComment = () => {
    axios
      .post("http://77.232.137.4:8000/comments", {
        pointID: id,
        message: comment,
      })
      .then(() => {
        navigation("/thanks");
      });
  };
  return (
    <div className="container bg-main pt-[100px]">
      <div className="">
        <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
          Предложение
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
          <Button title="Отправить" type="button" handleClick={postComment} />
        </form>
      </div>
    </div>
  );
};

export default Proposal;
