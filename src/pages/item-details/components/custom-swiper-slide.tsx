import cn from "classnames";
import { FC, useState } from "react";

type CustomSwiperSlideProps = {
  image: string;
  index?: number;
};

export const CustomSwiperSlide: FC<CustomSwiperSlideProps> = ({ image, index = 0 }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='h-full w-full'>
      {!loaded && <div className='skeleton-loader !rounded-2xl' />}
      <img onLoad={() => setLoaded(true)} className={cn("object-cover h-full w-full", { hidden: !loaded })} src={image} alt={`preview ${index}`} />
    </div>
  );
};
