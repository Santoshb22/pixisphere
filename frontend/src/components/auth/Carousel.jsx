import React from "react";
import authImages from "../../data/authImages";
import styles from "./Carousel.module.css";

const Carousel = () => {
  return (
    <div className="overflow-hidden absolute top-[47%]">
      <div className={styles.carouselTrack}>
        {authImages.concat(authImages).map((img, index) => (
          <img
            key={index}
            className="opacity-40 hover:opacity-100 w-[400px] h-[250px] rounded-md"
            src={img}
            alt={`auth page image ${index + 1}/${authImages.length}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
