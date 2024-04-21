const InfoField: React.FC<{ titleInfo: string; info: string }> = ({
  titleInfo,
  info,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{titleInfo}</span>
      <span className="text-xl font-bold break-words">{info}</span>
    </div>
  );
};

export { InfoField };
