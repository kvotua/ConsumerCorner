"use client";
import { useGetPointData } from "@/root/providers/PointDataProvider";
import { useAddPoint, useUploadFile } from "@/root/services/points";
import { FileInput } from "@/shared/Inputs/FileInput/FileInput";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface IFile {
  audit_log_file_id: File;
  license_file_ids: FileList;
  accreditation_file_ids: FileList;
}

export default function FilePoint() {
  const { setValues, values, id, setIds } = useGetPointData();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFile>({
    defaultValues: {
      accreditation_file_ids: values?.accreditation_file_ids,
      audit_log_file_id: values?.audit_log_file_id,
      license_file_ids: values?.license_file_ids,
    },
  });
  const {
    mutation: {
      mutate: licenseUbload,
      isSuccess: licenseSuccess,
      isError: licenseError,
    },
    ids: licenseIds,
    progress: licenseProgress,
  } = useUploadFile();

  const {
    mutation: {
      mutate: accreditationUbload,
      isSuccess: accreditationSuccess,
      isError: accreditationError,
    },
    ids: accreditationIds,
    progress: accreditationProgress,
  } = useUploadFile();
  const {
    mutation: {
      mutate: journalUbload,
      isSuccess: journalSuccess,
      isError: journalError,
    },
    ids: journalIds,
    progress: journalProgress,
  } = useUploadFile();
  useEffect(() => {
    if (licenseSuccess) {
      setIds((prev) => ({ ...prev, license_file_ids: licenseIds }));
    }
    if (accreditationSuccess) {
      setIds((prev) => ({ ...prev, accreditation_file_ids: accreditationIds }));
    }
    if (journalSuccess) {
      setIds((prev) => ({ ...prev, audit_log_file_id: journalIds[0] }));
    }
  }, [licenseSuccess, accreditationSuccess, journalSuccess]);
  const { push } = useRouter();
  useEffect(() => {
    if (
      !values?.inn ||
      !values.ogrn ||
      !values.title ||
      !values.address ||
      !values.phone_number
    ) {
      push("/points");
    }
  }, [values]);
  const { mutate } = useAddPoint();
  const onSubmit = () => {
    mutate({
      accreditation_file_ids: id.accreditation_file_ids,
      audit_log_file_id: id.audit_log_file_id,
      license_file_ids: id.license_file_ids,
      address: values?.address!,
      inn: values?.inn!,
      ogrn: values?.ogrn!,
      phone_number: values?.phone_number!,
      title: values?.title!,
    });
  };
  return (
    <form
      id="point"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <span className="text-center">Документы</span>
      <FileInput
        rules={{
          required: "Лицензия обязательна",
          onChange: (e) => {
            licenseUbload(e.target.value);
            setValues({ license_file_ids: e.target.value });
          },
        }}
        successUpload={licenseSuccess || !!id.license_file_ids.length}
        progressUbload={
          licenseProgress || (!!id.license_file_ids.length ? 100 : 0)
        }
        errorUpload={licenseError}
        name="license_file_ids"
        label="Лицензии"
        control={control}
        isError={!!errors.license_file_ids}
        errorMessage={errors.license_file_ids}
      />
      <FileInput
        rules={{
          required: "Аккредитация обязательна",
          onChange: (e) => {
            accreditationUbload(e.target.value);
            setValues({ accreditation_file_ids: e.target.value });
          },
        }}
        successUpload={
          accreditationSuccess || !!id.accreditation_file_ids.length
        }
        progressUbload={
          accreditationProgress ||
          (!!id.accreditation_file_ids.length ? 100 : 0)
        }
        errorUpload={accreditationError}
        name="accreditation_file_ids"
        label="Акредитации"
        control={control}
        isError={!!errors.accreditation_file_ids}
        errorMessage={errors.accreditation_file_ids}
      />
      <FileInput
        rules={{
          required: "Журнал обязателен",
          onChange: (e) => {
            journalUbload(e.target.value);
            setValues({ audit_log_file_id: e.target.value });
          },
        }}
        successUpload={journalSuccess || !!id.audit_log_file_id}
        progressUbload={journalProgress || (!!id.audit_log_file_id ? 100 : 0)}
        errorUpload={journalError}
        name="audit_log_file_id"
        label="Журнал учета проверок"
        control={control}
        isError={!!errors.audit_log_file_id}
        errorMessage={errors.audit_log_file_id}
      />
    </form>
  );
}
