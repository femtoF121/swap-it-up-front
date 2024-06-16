import { StarIcon } from "@/assets/icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import cn from "classnames";

type RatingProps = {
  setStars: Dispatch<SetStateAction<boolean[]>>;
  stars: boolean[];
  className?: string;
};

export const Rating: FC<RatingProps> = ({ setStars, stars, className }) => {
  const [hoveredStar, setHoveredStar] = useState(-1);

  const handleClickStar = (index: number) => {
    const res = [];
    for (let i = 0; i < 5; i++) {
      res.push(index >= i);
    }
    setStars(res);
  };

  const handleFillStar = (fill: boolean, index: number): string => {
    if (hoveredStar === -1) {
      if (fill) return "currentcolor";
      else return "transparent";
    } else {
      if (index <= hoveredStar) return "currentcolor";
      else return "transparent";
    }
  };

  return (
    <div className={cn("flex items-center text-2xl", className)}>
      {stars.map((fill, index) => (
        <StarIcon
          key={index}
          style={{ fill: handleFillStar(fill, index), cursor: "pointer" }}
          onMouseLeave={() => setHoveredStar(-1)}
          onMouseEnter={() => setHoveredStar(index)}
          onClick={() => handleClickStar(index)}
        />
      ))}
      <span className='font-semibold ml-2'>{stars.filter((v) => v).length}</span>
    </div>
  );
};
