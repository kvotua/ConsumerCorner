const PointScelteton: React.FC = () => {
  return (
    <div className="wrapper items-center animate-pulse">
      <div className="w-52 h-10 rounded-2xl bg-white/50"></div>
      <div className="w-full h-10 rounded-2xl bg-white/50 mt-2"></div>
      <div className="py-2 grid grid-cols-2 gap-2 w-full">
        <div className="w-full h-32 rounded-2xl bg-white/50 mt-2"></div>
        <div className="w-full h-32 rounded-2xl bg-white/50 mt-2"></div>
        <div className="w-full h-32 rounded-2xl bg-white/50 mt-2"></div>
        <div className="w-full h-32 rounded-2xl bg-white/50 mt-2"></div>
      </div>
      <div className="w-52 h-10 rounded-2xl bg-white/50"></div>
      <div className="w-52 h-10 rounded-2xl bg-white/50 mt-2"></div>
      <div className="w-full h-10 rounded-2xl bg-white/50 mt-2"></div>
    </div>
  );
};

export { PointScelteton };
