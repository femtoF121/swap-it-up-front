import cn from "classnames";
import { FC, useState } from "react";

type CustomSwiperSlideProps = {
  imageId: string;
  index: number;
};

export const CustomSwiperSlide: FC<CustomSwiperSlideProps> = ({ imageId, index }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className='h-full w-full'>
      {!loaded && <div className='skeleton-loader !rounded-2xl' />}
      <img
        onLoad={() => setLoaded(true)}
        className={cn("object-cover h-full w-full", { hidden: !loaded })}
        src={import.meta.env.VITE_SERVER_URL + "/items/pictures/" + imageId}
        alt={`preview ${index}`}
      />
    </div>
  );
};
