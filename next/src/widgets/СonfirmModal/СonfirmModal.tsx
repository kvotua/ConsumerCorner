import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { IConfirmModal } from "./ConfirmModal.model";

const ConfirmModal: React.FC<IConfirmModal> = ({
  title,
  description,
  successButtonTitle,
  cancelButtonTitle,
  cancelButtonClick,
  successButtonClick,
  cancelButtonClass,
  successButtonClass,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 container">
      <div className="w-full p-5 bg-white rounded-2xl text-textColor-black">
        <h3
          className={`text-2xl font-bold break-words ${
            description ||
            (successButtonClick && successButtonTitle) ||
            (cancelButtonClick && cancelButtonTitle)
              ? "mb-2"
              : ""
          }`}
        >
          {title}
        </h3>
        {description && <span className="break-words">{description}</span>}
        <div className="flex gap-2">
          {successButtonClick && successButtonTitle && (
            <ButtonBase
              handleClick={successButtonClick}
              className={`!bg-backgroundColor-black text-white ${successButtonClass}`}
            >
              {successButtonTitle}
            </ButtonBase>
          )}
          {cancelButtonClick && cancelButtonTitle && (
            <ButtonBase
              handleClick={cancelButtonClick}
              className={`!bg-backgroundColor-black text-white ${cancelButtonClass}`}
            >
              {cancelButtonTitle}
            </ButtonBase>
          )}
        </div>
      </div>
    </div>
  );
};

export { ConfirmModal };
