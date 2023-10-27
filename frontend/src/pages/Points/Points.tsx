import axios from "axios";
import { Button } from "../../shared/Buttons/Button/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import penc from "../../assets/pencil.svg";

interface IUser {
  name: string;
  surname: string;
  phone_number: string;
  points_id: string[];
}
const Points = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<any>();
  const [points, setPoints] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPoints = async () => {
    const points = await Promise.all(
      user.points_id &&
        user?.points_id.map(async (id: string) => {
          const res = await axios.get(
            `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points?pointID=${id}`
          );
          return res.data;
        })
    );
    setPoints(points);
  };

  const getUser = () => {
    axios
      .get(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors/by/token?token=${token}`
      )
      .then(({ data }) => {
        setUser(data);
        setIsLoading(true);
      });
  };
  useEffect(() => {
    getPoints();
  }, [isLoading]);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="container bg-main h-screen pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Мои точки
      </h2>

      <div className="flex flex-col gap-[10px] overflow-scroll h-[400px] mb-6">
        {points.map((point: any, i: number) => (
          <Link to={`${point.id}/reviews`} key={i}>
            <div className="flex justify-between items-center px-[10px]">
              <span className=" text-[20px] font-bold text-originWhite">
                {point.title}
              </span>
              <Link to={`${point.id}/edit`}>
                <img src={penc} alt="" className="w-10" />
              </Link>
            </div>
            <div className="w-full h-20 bg-originWhite rounded-ButtonEntrepreneur flex justify-between items-center pl-[20px] pr-[20px] overflow-scroll gap-[10px]">
              <p className="block w-[full] overflow-scroll text-[20px] font-medium text-originBlack opacity-70">
                {point.address}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-[10px]">
        <Button title="Добавить точку" type="button" link="/addPoints" />
        <Button
          title="Профиль"
          isActive
          type="button"
          link="/EntrepreneurProfile"
        />
      </div>
    </div>
  );
};

export { Points };
