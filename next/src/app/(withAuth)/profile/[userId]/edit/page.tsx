import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";

export default function Edit() {
  return (
    <section className="wrapper container">
      {/* <h2 className="title">Редактировать профиль</h2> */}
      {/* <form className="flex-grow flex flex-col gap-2 py-5">
      <TextFieldBase {...register("name", { required: true })} label="Имя" />
      <TextFieldBase
        {...register("surname", { required: true })}
        label="Фамилия"
      />
      <TextFieldBase
        {...register("login", { required: true })}
        label="Логин"
      />
      <TextFieldBase
        {...register("email", { required: true })}
        label="Эл. почта"
      />
    </form> */}
      <div className="flex-grow flex justify-center items-center text-2xl text-center font-bold">
        Эта страница скоро будет работать
      </div>
      <div className="buttons">
        {/* {isDirty && <ButtonBase>Сохранить</ButtonBase>} */}
        <ButtonBack />
      </div>
    </section>
  );
}
