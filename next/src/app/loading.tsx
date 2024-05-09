import Image from "next/image";

import logotype from "@/root/assets/noBgLogo.svg";

export default function loading() {
  return (
    <div className="container wrapper flex justify-center items-center">
      <Image src={logotype} alt="logotype" priority />
    </div>
  );
}
