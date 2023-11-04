import { useEffect, useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/Buttons/Button/Button";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";

import {
    useDeletePointsMutation,
    useGetPointsByIdQuery,
    usePatchPointsMutation,
} from "../../store/Slices/FetchSlice";

const EditPoint = () => {
    const [address, setAddress] = useState<string>("");
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState<string>();
    
    const navigate = useNavigate();
    const { id }: any = useParams();
    const token = localStorage.getItem("token");

    const { data, isLoading } = useGetPointsByIdQuery(id);
    const getPoint = () => {
        setTitle(data?.title);
        setAddress(data?.address);
    };
    const [patchPoints] = usePatchPointsMutation();
    const patchPoint = () => {
        patchPoints({
            token,
            id,
            body: {
                title: title,
                address: address,
            },
        }).then(() => {
            navigate("/points");
        });
    };
    const [deletePoint] = useDeletePointsMutation();
    const deletePoints = () => {
        deletePoint({ token, id }).then(() => {
            navigate(-1);
        });
    };

    useEffect(() => {
        getPoint();
    }, [isLoading]);

    return (
        <div className='container h-screen pt-[100px]'>
            <h2 className='text-center text-originWhite text-[30px] font-bold mb-10'>
                Редактирование
            </h2>
            <form>
                <label className='block mb-10'>
                    <h2 className='text-originWhite text-[24px] font-medium'>
                        Название
                    </h2>
                    <AuthInput setValue={setTitle} value={title} />
                </label>
                <label className='block mb-10'>
                    <h2 className='text-originWhite text-[24px] font-medium'>
                        Адресс
                    </h2>
                    <AuthInput setValue={setAddress} value={address} />
                </label>
                <div className='flex gap-[10px] mb-[10px]'>
                    <Button
                        title='Изменить'
                        type='button'
                        handleClick={() => {
                            patchPoint();
                            navigate(-1);
                        }}
                        isActive
                    />

                    <Button
                        title='qr-код'
                        type='button'
                        handleClick={() => setModal(true)}
                    />
                </div>

                <Button
                    title='Удалить'
                    type='button'
                    handleClick={() => {
                        deletePoints();
                    }}
                    style={{ background: "red", border: "none", opacity: 0.8 }}
                />
            </form>
            <ButtonBack />

            {modal && (
                <div className='fixed  w-full h-full bg-opacity-90 top-0 left-0 bg-originBlack flex flex-col items-center justify-center p-[10px]'>
                    <Button
                        title='Закрыть'
                        type='button'
                        isActive
                        handleClick={() => setModal(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default EditPoint;
