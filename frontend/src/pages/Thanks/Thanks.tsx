import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"

const Thanks = () => {
  return (
    <div className="absolute top-0 left-0 h-screen text-center flex flex-col justify-center items-center">
      <h1 className="text-30px font-medium text-white ">Спасибо за отзыв!</h1>
      <p className="text-18px text-white container">
        Мы учтем Ваши слова при нашей дальнейшей работе и будем стараться
        становиться лучше!
      </p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
            <ButtonLink link="/" title="На главную" isActive/>
      </div>
    </div>
  )
}

export { Thanks }
