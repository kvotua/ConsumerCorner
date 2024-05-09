import Image from "next/image";

import loaderIcon from "@/root/assets/loading.svg";

const Preloader: React.FC = () => {
  return (
    <main className="container wrapper flex justify-center items-center">
      <Image src={loaderIcon} alt="loader" />
    </main>
  );
};

export { Preloader };
