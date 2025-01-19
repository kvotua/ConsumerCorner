"use client"
import { useGetFirmaByPointId } from "@/root/services/points";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { Separate } from "@/shared/Separate/Separate";
import { useParams } from "next/navigation";
import { PointScelteton } from "../PointScelteton";

function formatName(fullName: string | undefined) {
  if (!fullName) {
    return;
  }

  const parts = fullName.split(' ');

  if (parts.length < 3) {
    throw new Error("Полное имя должно содержать фамилию, имя и отчество.");
  }

  const lastName = parts[0];
  const firstNameInitial = parts[1].charAt(0) + '.';
  const patronymicInitial = parts[2].charAt(0) + '.';

  return `ИП ${lastName} ${firstNameInitial}${patronymicInitial}`;
}

export default function Socials() {
  const { pointId } = useParams()
  const { data } = useGetFirmaByPointId(pointId as string);

  if (data == undefined) {
    return (
      <section className="wrapper container">
        <PointScelteton/>
      </section>
    )
  }
  
  const name = formatName(data?.name || "")

  const pointInfo = {
    title: data?.title,
    who: name,
    address: data?.address,
    inn: data?.inn,
    ogrn: data?.ogrn,
  }
  const names = data.social_data.map(social => social.name);
  const links = data.social_data.map(social => social.link);

  return (
    <section className="wrapper container">
      <p className="text-xl opacity-50 pt-5 break-words">
        уголок потребителя
      </p>
      <h2 className="title pt-3">
        {pointInfo.who}
      </h2>
      <Separate/>
      {names.length > 0 ? (
        <div className="flex-grow flex flex-col gap-6 py-5" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 95px)', padding: '0', scrollbarWidth: 'none' }}>
        {names.map((name, index) => (
          <ButtonBase
            key={index}
            link={links[index]}
            roundedCorners={['top-left']}
            style={{
              fontWeight: 'normal',
              height: '70px',
              borderEndEndRadius: '10px',
              borderStartEndRadius: '10px',
              borderEndStartRadius: '10px',
              flexShrink: 0 // Это свойство предотвращает сжатие кнопок
            }}
          >
            Перейти на {name}
          </ButtonBase>
        ))}
      </div>
      ) : (
        <div className="flex-grow flex flex-col gap-6 py-5 items-center justify-center" style={{ fontSize: '24px', height: '100%', textAlign: 'center', fontWeight: 'bold' }}>
          <p>Нет соц. сетей</p>
        </div>
      )}
      <div className="buttons" style={{ marginTop: '15px'}}>
        <ButtonBack />
      </div>
    </section>
  );
};