import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"

const Other = () => {
  return (
    <div className="flex h-full flex-col container pb-4 pt-4">
      <div className="h-full flex justify-center items-center text-white text-18px text-center font-bold ">
        Эта страница заработает чуть позже
      </div>
      <ButtonBack isActive />
    </div>
  )
}

export { Other }
