import { Link } from "react-router-dom";
import { IPointCatd } from "./PointCard.model";

const PointCard: React.FC<IPointCatd> = ({ address, id, rating }) => {
  return (
    <Link to={`/point/${id}`} className="flex flex-col gap-2 p-5 bg-white/10 rounded-left border border-white/20">
      <p className="font-medium break-words">{address}</p>
      <div className="flex gap-2 font-medium">
        <span>4.97</span>
        <img src="/star.svg" alt="star" />
        <img src="/star.svg" alt="star" />
        <img src="/star.svg" alt="star" />
        <img src="/star.svg" alt="star" />
        <img src="/star.svg" alt="star" />
      </div>
    </Link>
  );
};

export { PointCard };
