import { useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Button } from "../../shared/Buttons/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPoints = () => {
    const [title, setTilte] = useState("");
    const [addres, setAddres] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const postPoints = () => {
        axios
            .post(`http://192.168.0.8:8000/points?token=${token}`, {
                title: title,
                address: addres,
            })
            .then(() => navigate("/points"));
    };
    return (
        <div className='container bg-main h-screen pt-[100px]'>
            <h2 className='text-center text-originWhite text-[30px] font-bold mb-10'>
                Добавить точку
            </h2>
            <form className='flex flex-col gap-[10px]'>
                <AuthInput
                    setValue={setTilte}
                    title='Назавание точки'
                    value={title}
                />
                <AuthInput
                    setValue={setAddres}
                    title='Адресс точки'
                    value={addres}
                />

                <Button
                    title='Добавить'
                    type='button'
                    isActive
                    handleClick={postPoints}
                />
            </form>
        </div>
    );
};

export default AddPoints;
