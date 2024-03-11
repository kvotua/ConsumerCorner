import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center container">
      <span className="text-30px text-white font-bold">404</span>
      <h1 className="text-18px text-white font-bold">
        Такой страницы не существует
      </h1>
      <ButtonBack isActive className="mt-4"/>
    </div>
  )
}

export { NotFound }
