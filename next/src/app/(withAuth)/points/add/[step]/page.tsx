"use client";

import { useParams } from "next/navigation";
import InfoPoint from "./InfoPoint";
import FilePoint from "./filePoint";
import ContactPoint from "./contactPoint";

export default function AddPoint() {
  const { step } = useParams();
  return (
    <>
      {+step === 1 ? (
        <InfoPoint />
      ) : +step === 2 ? (
        <ContactPoint />
      ) : +step === 3 ? (
        <FilePoint />
      ) : (
        null
      )}
    </>
  );
}
