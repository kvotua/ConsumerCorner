import { motion } from "framer-motion";

const Preloader: React.FC = () => {
  return (
    <main className="container wrapper flex justify-center items-center">
      <motion.img
        initial={{
          y: "100%",
        }}
        whileInView={{
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "backOut",
        }}
        src="/noBgLogo.svg"
        alt=""
      />
    </main>
  );
};

export { Preloader };
