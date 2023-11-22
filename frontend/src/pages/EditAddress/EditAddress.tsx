import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { usePatchPointMutation } from "src/store/RTKSlice/api";
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack";
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit";
import { Input } from "src/ui/Input/Input";
import { Title } from "src/ui/Title/Title";

const EditAddress: FC = ({}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const token = localStorage.getItem("token");
    const { pointId } = useParams();
    const [patchPoint] = usePatchPointMutation();
    const navigate = useNavigate();
    const onSubmit = (data: FieldValues) => {
        patchPoint({
            token,
            pointId,
            body: {
                address: `${data.city} ${data.region} ${data.street} ${data.house} ${data.housing}`,
            },
        }).then(() => {
            navigate(-1);
        });
    };
    return (
        <div>
            <Title title='Изменение адреса' />

            <form
                onSubmit={handleSubmit((data) => onSubmit(data))}
                className='flex flex-col gap-[4vh] mt-[8vh] h-[50vh] overflow-scroll'>
                <Input
                    useForm={register("city", {
                        required: "обязательное поле",
                    })}
                    isActive={false}
                    title='Город'
                    isError={!!errors.city}
                    errorMessage={errors.city?.message}
                />
                <Input
                    useForm={register("region", {
                        required: "обязательное поле",
                    })}
                    isActive={false}
                    title='Область'
                    isError={!!errors.region}
                    errorMessage={errors.region?.message}
                />
                <Input
                    useForm={register("street", {
                        required: "обязательное поле",
                    })}
                    isActive={false}
                    title='Улица'
                    isError={!!errors.street}
                    errorMessage={errors.street?.message}
                />
                <div className='flex justify-between gap-[90px]'>
                    <Input
                        useForm={register("house", {
                            required: "обязательное поле",
                            pattern: /^\d*$/,
                        })}
                        isActive={false}
                        title='Дом'
                        isError={!!errors.house}
                        errorMessage={errors.house?.message}
                    />
                    <Input
                        useForm={register("housing", {
                            required: "обязательное поле",
                            pattern: /^\d*$/,
                        })}
                        isActive={false}
                        title='Корпус'
                        isError={!!errors.housing}
                        errorMessage={errors.housing?.message}
                    />
                </div>
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] '>
                    <ButtonSubmit isActive title='Изменить' type='submit' />
                    <ButtonBack />
                </div>
            </form>
        </div>
    );
};

export { EditAddress };
