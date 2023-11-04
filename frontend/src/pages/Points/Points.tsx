import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../shared/Buttons/Button/Button";
import {
    useGetUserByTokenQuery,
    useLazyGetPointsByIdQuery,
} from "../../store/Slices/FetchSlice";
import penc from "../../assets/pencil.svg";

const Points = () => {
    const token = localStorage.getItem("token");
    const { data: user, isSuccess, isLoading } = useGetUserByTokenQuery(token);
    const [trigger] = useLazyGetPointsByIdQuery();
    const [points, setPoints] = useState<any>([]);
    console.log(isLoading);
    
    useEffect(() => {
        if (isSuccess) {
            const fetchPoints = user?.points_id.map(async (id: string) => {
                const { data: point } = await trigger([id]);
                return point;
            });
            Promise.all(fetchPoints).then((point) => setPoints(point));
        }
    }, [isLoading]);
    return (
        <div className='container bg-main h-screen  pt-[100px]'>
            <h2 className='text-center text-originWhite text-[30px] font-bold mb-10'>
                Мои точки
            </h2>

            <div className='flex flex-col gap-[10px] overflow-scroll h-[400px] mb-6'>
                {!isLoading
                    ? points.map((point: any, i: number) => (
                          <Link to={`${point.id}/reviews`} key={i}>
                              <div className='flex justify-between items-center px-[10px]'>
                                  <span className=' text-[20px] font-bold text-originWhite'>
                                      {point.title}
                                  </span>
                                  <Link to={`${point.id}/edit`}>
                                      <img src={penc} alt='' className='w-10' />
                                  </Link>
                              </div>
                              <div className='w-full h-20 bg-originWhite rounded-ButtonEntrepreneur flex justify-between items-center pl-[20px] pr-[20px] overflow-scroll gap-[10px]'>
                                  <p className='block w-[full] overflow-scroll text-[20px] font-medium text-originBlack opacity-70'>
                                      {point.address}
                                  </p>
                              </div>
                          </Link>
                      ))
                    : "loading"}
            </div>
            <div className='flex gap-[10px]'>
                <Button
                    title='Добавить точку'
                    type='button'
                    link='/addPoints'
                />
                <Button
                    title='Профиль'
                    isActive
                    type='button'
                    link='/EntrepreneurProfile'
                />
            </div>
        </div>
    );
};

export { Points };
