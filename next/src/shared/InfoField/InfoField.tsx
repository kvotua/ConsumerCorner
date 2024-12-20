const InfoField: React.FC<{ titleInfo: string; info?: string }> = ({
  titleInfo,
  info,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{titleInfo}</span>
      {info ? (
        <span className="text-xl font-bold break-words">{info}</span>
      ) : (
        <div className="w-full h-10 bg-white/50 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
};

export { InfoField };
