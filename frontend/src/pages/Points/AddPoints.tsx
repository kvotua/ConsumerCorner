import { useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Button } from "../../shared/Buttons/Button/Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack";
import { usePostPointMutation } from "../../store/Slices/FetchSlice";

const AddPoints = () => {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [addPoint] = usePostPointMutation();

    const postPoint = () => {
        addPoint({
            token: token,
            body: {
                title: title,
                address: address,
            },
        }).then(() => {
            navigate("/points");
        });
    };

    return (
        <div className='container bg-main h-screen pt-[100px]'>
            <h2 className='text-center text-originWhite text-[30px] font-bold mb-10'>
                Добавить точку
            </h2>
            <form className='flex flex-col gap-[10px]'>
                <AuthInput
                    setValue={setTitle}
                    title='Назавание точки'
                    value={title}
                />
                <AuthInput
                    setValue={setAddress}
                    title='Адрес точки'
                    value={address}
                />

                <Button
                    title='Добавить'
                    type='button'
                    isActive
                    handleClick={() => postPoint()}
                />
            </form>
            <ButtonBack />
        </div>
    );
};

export default AddPoints;
