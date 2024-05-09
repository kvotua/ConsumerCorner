const ReviewCard: React.FC<{ review: string }> = ({ review }) => {
  return (
    <div className="flex flex-col gap-2 p-5 bg-white/10 rounded-left border border-white/20">
      <div className="flex items-center gap-5 border-b pb-2">
        <div className="w-10 h-10 bg-white rounded-full"></div>
        {/* <div> */}
        <span className="font-bold justify-self-start">Гость</span>
        {/* <div className="flex gap-1">
          <span className="mr-2">5</span>
          <img src="/star.svg" alt="star" />
            <img src="/star.svg" alt="star" />
            <img src="/star.svg" alt="star" />
            <img src="/star.svg" alt="star" />
            <img src="/star.svg" alt="star" />
        </div> */}
        {/* </div> */}
      </div>
      <p className="font-medium break-words">{review}</p>
    </div>
  );
};

export { ReviewCard };
