import React, { useEffect, useRef, useState } from 'react';
import './FeaturedCarousel.css';

const featuredItems = [
  {
    title: "Cattle",
    image: "src/assets/images/cowImage.jpg",
    link: "/products/cattle",
  },
  {
    title: "Dairy Products",
    image: "src/assets/images/milkTanks.jpg",
    link: "/products/dairy",
  },
  {
    title: "Farming Tools",
    image: "src/assets/images/farmingTools.png",
    link: "/products/tools",
  },
];

function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds
  };

  const stopAutoSlide = () => {
    clearInterval(slideIntervalRef.current);
  };

  return (
    <div className="featured-carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredItems.map((item, index) => (
          <a
            href={item.link}
            className="carousel-slide"
            key={index}
            aria-label={item.title}
          >
            <img src={item.image} alt={item.title} />
            <div className="carousel-overlay">
              <h2>{item.title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCarousel;
