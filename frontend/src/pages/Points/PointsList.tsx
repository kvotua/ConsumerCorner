import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { api } from "src/app/http";
import { PointCard } from "src/entities/PointCard/PointCard";
import { PointCardSceleton } from "src/entities/PointCard/PointCardSceleton";

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
        userPoints!.map((id) =>
          api.get(`/points?pointID=${id}`).then(({ data }) => data)
        )
      );
    },
  });
  return (
    <div className="py-5 flex-grow">
      <ul className="flex flex-col gap-5">
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
    </div>
  );
};

export { PointsList };
