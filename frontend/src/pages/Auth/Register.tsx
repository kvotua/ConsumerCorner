import { useState } from "react";
import { AuthInput } from "../../shared/Inputs/AuthInput";
import { Button } from "../../shared/Buttons/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
    setName,
    setPhone,
    setSurname,
} from "../../store/Slices/RegisterSlice";

const Register = () => {
    const [name, setNameUser] = useState<string>("");
    const [surname, setSurnameUser] = useState<string>("");
    const [phone, setPhoneUser] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = () => {
        dispatch(setName(name));
        dispatch(setSurname(surname));
        dispatch(setPhone(phone));
        axios
            .get(
                `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors/verify/phone?phone_number=%2B${phone}`
            )
            .then(() => navigate("/confirm"))
            .catch(() => {
                alert("Не правильно набран номер");
            });
    };

    return (
        <div className='container bg-main h-screen pt-[100px]'>
            <h2 className='text-center text-originWhite text-[30px] font-bold'>
                Регистрация
            </h2>
            <form className='flex flex-col gap-[10px] pt-[100px]'>
                <AuthInput title='Имя' setValue={setNameUser} value={name} />
                <AuthInput
                    title='Фамилия'
                    setValue={setSurnameUser}
                    value={surname}
                />
                <AuthInput
                    title='Телефон'
                    setValue={setPhoneUser}
                    value={phone}
                />

                <Button
                    isActive
                    type='button'
                    title='Подтвердить'
                    handleClick={user}
                />


                    <Button type='button' title='Назад' link="/"/>
            </form>
        </div>
    );
};
``;

export default Register;
