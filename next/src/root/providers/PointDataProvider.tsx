import { createContext, useContext, useState } from "react";

import { IPoint, IPointAdd } from "../types/point";

const PointData = createContext<{
  values: Partial<IPointAdd> | undefined;
  id: Omit<
    IPoint,
    "address" | "id" | "inn" | "ogrn" | "phone_number" | "title"
  >;
  setIds: React.Dispatch<
    React.SetStateAction<
      Omit<IPoint, "address" | "id" | "inn" | "ogrn" | "phone_number" | "title">
    >
  >;
  setValues: (newValue: Partial<IPointAdd>) => void;
  clearValues: () => void;
}>({
  values: {},
  id: {
    accreditation_file_ids: [],
    audit_log_file_id: "",
    license_file_ids: [],
  },
  setIds: () => {},
  setValues: () => {},
  clearValues: () => {},
});

export const PointDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<Partial<IPointAdd>>();
  const [id, setIds] = useState<
    Omit<IPoint, "address" | "id" | "inn" | "ogrn" | "phone_number" | "title">
  >({
    accreditation_file_ids: [],
    audit_log_file_id: "",
    license_file_ids: [],
  });
  // const setIds = (id: string) => {
  //   setId((prev) => ({ ...prev, id }));
  // };
  const setValues = (newValue: Partial<IPointAdd>) => {
    setValue((prev) => ({ ...prev, ...newValue }));
  };
  const clearValues = () => {
    setValue({});
    setIds({
      accreditation_file_ids: [],
      audit_log_file_id: "",
      license_file_ids: [],
    });
  };
  return (
    <PointData.Provider
      value={{
        id,
        setIds,
        values: value,
        setValues,
        clearValues,
      }}
    >
      {children}
    </PointData.Provider>
  );
};
export const useGetPointData = () => useContext(PointData);
