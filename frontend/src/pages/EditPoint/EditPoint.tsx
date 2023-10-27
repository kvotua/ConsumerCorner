import { useEffect, useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/Buttons/Button/Button";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";

const EditPoint = () => {
  const [address, setAddress] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState<string>();

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const getPoint = () => {
    axios
      .get(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points?pointID=${id}`
      )
      .then(({ data }) => {
        setTitle(data?.title);
        setAddress(data?.address);
      });
  };
  const patchPoint = () => {
    axios.patch(
      `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points?token=${token}&pointID=${id}`,
      {
        title: title,
        address: address,
      }
    );
  };
  const deletePoint = () => {
    axios.delete(
      `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points?token=${token}&pointID=${id}`
    );
  };

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <div className="container h-screen pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Редактирование
      </h2>
      <form>
        <label className="block mb-10">
          <h2 className="text-originWhite text-[24px] font-medium">Название</h2>
          <AuthInput setValue={setTitle} value={title} />
        </label>
        <label className="block mb-10">
          <h2 className="text-originWhite text-[24px] font-medium">Адресс</h2>
          <AuthInput setValue={setAddress} value={address} />
        </label>
        <div className="flex gap-[10px] mb-[10px]">
          <Button
            title="Изменить"
            type="button"
            handleClick={() => {
              patchPoint();
              navigate(-1);
            }}
            isActive
          />

          <Button
            title="qr-код"
            type="button"
            handleClick={() => setModal(true)}
          />
        </div>

        <Button
          title="Удалить"
          type="button"
          handleClick={() => {
            deletePoint();
            navigate(-1);
          }}
          style={{ background: "red", border: "none", opacity: 0.8 }}
        />
      </form>
      <ButtonBack />

      {modal && (
        <div className="fixed  w-full h-full bg-opacity-90 top-0 left-0 bg-originBlack flex flex-col items-center justify-center p-[10px]">

          <Button
            title="Закрыть"
            type="button"
            isActive
            handleClick={() => setModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EditPoint;
