import { FC } from "react";
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink";
import { Logo } from "src/ui/Logo/Logo";

const Home: FC = ({}) => {
    return (
        <>
            <Logo />
            <h1 className='title'>Добро пожаловать!</h1>
            <p className='text-center text-15px text-white opacity-70'>
                Войдите или зарегистрируйтесь, чтобы получить полный доступ к
                приложению.
            </p>
            <div className='flex flex-col gap-[10px]'>
                <ButtonLink title='Регистрация' link='register' isActive />
                <ButtonLink title='Вход' link='login' />
            </div>

            <p className='text-center text-15px text-white opacity-70 table-row absolute bottom-0 left-1/2 -translate-x-1/2 container'>
                Удобные инструменты позволяющие вашему бизнесу быть в курсе и
                оперативно реагировать на пожелания клиента
            </p>
        </>
    );
};

export { Home };
