import { PointCard } from "@/entities/PointCard/PointCard";
import { PointCardSceleton } from "@/entities/PointCard/PointCardSceleton";
import { useAppSelector } from "@/root/hooks/useAppSelector";
import { api } from "@/root/http";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

const PointsList: React.FC = () => {
  const userPoints = useAppSelector(
    (state) => state.userReduser.user?.points_id
  );
  const {
    data: points,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getPoints", userPoints],
    queryFn: async () => {
      return await Promise.all(
        userPoints!.map((id: string) =>
          api.get(`/points?pointID=${id}`).then(({ data }) => data)
        )
      );
    },
  });
  return (
    <>
      {points ? (
        <ul className="py-5 flex flex-col gap-5">
          {isLoading || isFetching
            ? [...Array(5)].map((_, i) => <PointCardSceleton key={i} />)
            : points?.map(({ address, id }, i) => (
                <motion.li
                  initial={{
                    y: "100%",
                    opacity: 0,
                  }}
                  whileInView={{
                    y: 0,
                    opacity: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={id}
                >
                  <PointCard address={address} id={id} />
                </motion.li>
              ))}
        </ul>
      ) : (
        <span className=" flex justify-center items-center text-4xl text-center font-bold ">
          У вас пока нет точек
        </span>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(PointsList), { ssr: false });
