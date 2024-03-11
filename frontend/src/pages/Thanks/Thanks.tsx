import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"

const Thanks = () => {
  return (
    <div className="absolute top-0 left-0 h-screen text-center flex flex-col justify-center items-center container pt-4">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-30px font-medium text-white ">Спасибо за отзыв!</h1>
        <p className="text-18px text-white container ">
          Мы учтем Ваши слова при нашей дальнейшей работе и будем стараться
          становиться лучше!
        </p>
      </div>
      <div className="w-full pb-4">
        <ButtonLink link="/" title="На главную" isActive />
      </div>
    </div>
  )
}

export { Thanks }
