import { FC } from "react";

interface ITitle {
    title: string;
}
const Title: FC<ITitle> = ({ title }) => {
    return (
        <>
            <span className='text-white text-18px opacity-70'>
                Уголок потребителя
            </span>
            <h2 className='text-white text-30px font-bold py-[10px] border-b '>{title}</h2>
        </>
    );
};

export { Title };
