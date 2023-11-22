import { FC } from "react";

import star from "src/assets/star.svg";
import { Link } from "react-router-dom";

interface IPointItem {
    address: string;
    pointId: string;
}
const PointItem: FC<IPointItem> = ({ address, pointId }) => {
    return (
        <Link
            to={`/point/${pointId}`}
            className='flex justify-between items-center'>
            <div className=''>
                <address className='text-18px text-white font-medium'>
                    {address}
                </address>
                <div className='flex gap-[6px] items-center text-white'>
                    <span>3,87</span>
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                    <img src={star} alt='' />
                </div>
            </div>
            <div className='w-[40px] h-[40px] border border-white rounded-[50%] relative before:absolute before:w-[30px] before:h-[30px] before:bg-white before:rounded-[50%] before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2'></div>
        </Link>
    );
};

export { PointItem };
