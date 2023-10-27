import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../../../shared/Buttons/Button/Button";
import { AuthInput } from "../../../shared/Inputs/AuthInput";

const EntrepreneurProfileEdit = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [surname, setSurname] = useState("");
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);

  const token = localStorage.getItem("token");

  const getUser = () => {
    axios
      .get(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors/by/token?token=${token}`
      )
      .then(({ data }) => {
        setName(data.name);
        setPhone(data.phone_number.slice(5));
        setSurname(data.surname);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const getPhone = () => {
    axios.get(
      `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors/verify/phone?phone_number=%2B${phone}`
    );
  };

  const patchUser = () => {
    if (visibleCode) {
      axios.patch(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors?token=${token}`,
        {
          name: name,
          surname: surname,
          phone_number: "+" + phone,
          code: code,
        }
      );
    }
    axios.patch(
      `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors?token=${token}`,
      {
        name: name,
        surname: surname,
      }
    );
  };

  //   const patchUserFI = () => {
  //     axios.patch(
  //       `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/proprietors?token=${token}`,
  //       {
  //         name: name,
  //         surname: surname,
  //       }
  //     );
  //   };

  return (
    <div className="container h-screen pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Редактировать
      </h2>
      <form className="flex flex-col gap-[10px] mb-[10px] w-full">
        <div className="flex gap-[10px] ">
          <AuthInput title="Имя" setValue={setName} value={name} />
          <AuthInput title="Фамилия" setValue={setSurname} value={surname} />
        </div>

        <div className="w-full h-full relative">
          <AuthInput
            type="tel"
            title="Телоефон"
            setValue={setPhone}
            value={phone}
            handleChange={() => setVisible(true)}
          />
          {visible && (
            <button
              type="button"
              onClick={() => {
                setVisibleCode(true);
                getPhone();
              }}
              className="p-3 bg-originWhite absolute right-3 top-1/2 -translate-y-1/4 text-[0.8rem] font-bold text-originBlack rounded-[10px]"
            >
              Отправить код
            </button>
          )}
        </div>
      </form>

      {visibleCode && (
        <>
          <AuthInput setValue={setCode} value={code} title="код из смс" />
        </>
      )}
      <div className="flex gap-[10px] fixed w-full left-0 bottom-0 p-[10px]">
        <Button
          title="Готово"
          isActive
          type="button"
          link="/EntrepreneurProfile"
          handleClick={patchUser}
        />
        <Button title="Назад" type="button" link="/" />
      </div>
    </div>
  );
};

export default EntrepreneurProfileEdit;
