import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProgressContext } from "src/app/providers/ProgressProvider";
import { FileInput } from "src/shared/Inputs/FileInput/FileInput";
import { TextFieldBase } from "src/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";
import { useAddPoint } from "src/app/services/points.service";
import { IPointAdd } from "./PointsAdd.type";

const PointAddForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IPointAdd>>({
    values: {
      inn: "7727563778",
      ogrn: "1057749631994",
    },
  });

  const { setProgress, progress } = useContext(ProgressContext);

  const { mutate } = useAddPoint();

  const onSubmit = async (data: Partial<IPointAdd>) => {
    if (progress === 2) {
      mutate(data as IPointAdd);
    } else {
      setProgress((prev) => prev + 1);
    }
  };

  return (
    <form
      id="point"
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex-grow flex flex-col justify-center gap-5 py-5"
    >
      <h3 className="text-center font-bold text-sm pb-5">
        {progress === 0 && "Основная информация"}
        {progress === 1 && "Документы"}
        {progress === 2 && "Контактная информация"}
      </h3>
      <AnimatePresence mode="wait" initial={false}>
        {progress === 0 && (
          <motion.div
            key={1}
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{ x: "-100%", opacity: 0 }}
          >
            <TextFieldBase
              {...register("title", { required: true })}
              placeholder="Название"
              label="Название предприятия"
              isError={!!errors.title}
            />
            <div className="flex gap-5">
              <TextFieldBase
                {...register("inn", { required: true })}
                placeholder="7727563778"
                label="ИНН"
                isError={!!errors.inn}
              />
              <TextFieldBase
                {...register("ogrn", { required: true })}
                placeholder="1057749631994"
                label="ОГРН"
                isError={!!errors.ogrn}
              />
            </div>
          </motion.div>
        )}
        {progress === 1 && (
          <motion.div
            key={2}
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{ x: "-100%", opacity: 0 }}
          >
            <div className="flex flex-col gap-2">
              <FileInput
                {...register("license_file_ids", {
                  required: true,
                  onChange: (e) => {
                    const subLabel = document.getElementById(
                      `${e.target.id}-sublabel`
                    );
                    if (subLabel) {
                      subLabel.textContent =
                        e.target.files[0].name.length > 15
                          ? e.target.files[0].name.slice(0, 15) + " ..."
                          : e.target.files[0].name;
                    }
                  },
                })}
                label="Лицензия"
              />
              <FileInput
                {...register("accreditation_file_ids", {
                  required: true,
                  onChange: (e) => {
                    const subLabel = document.getElementById(
                      `${e.target.id}-sublabel`
                    );
                    if (subLabel) {
                      subLabel.textContent =
                        e.target.files[0].name.length > 15
                          ? e.target.files[0].name.slice(0, 15) + " ..."
                          : e.target.files[0].name;
                    }
                  },
                })}
                label="Аккредитация"
              />
              <FileInput
                {...register("audit_log_file_id", {
                  required: true,
                  onChange: (e) => {
                    const subLabel = document.getElementById(
                      `${e.target.id}-sublabel`
                    );
                    if (subLabel) {
                      subLabel.textContent =
                        e.target.files[0].name.length > 15
                          ? e.target.files[0].name.slice(0, 15) + " ..."
                          : e.target.files[0].name;
                    }
                  },
                })}
                label="Журнал учета проверок"
              />
            </div>
          </motion.div>
        )}
        {progress === 2 && (
          <motion.div
            key={3}
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{ x: "-100%", opacity: 0 }}
          >
            <TextFieldBase
              {...register("address", { required: true })}
              label="Адрес адрес предприятия"
              placeholder="г. Москва, ул. Центральная"
              isError={!!errors.address}
            />
            <TextFieldBase
              {...register("phone_number", {
                required: true,
                pattern:
                  /^(\+7|8)\s?(\(\d{3}\)|\d{3})\s?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/,
              })}
              placeholder="+7 905 123 45 67"
              label="Телефон"
              isPhone
              isError={!!errors.phone_number}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export { PointAddForm };
