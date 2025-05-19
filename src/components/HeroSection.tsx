import { useEffect, useState } from 'react';
import '../styles/HeroSection.css';
import img1 from '../assets/ft1.jpg';
import img2 from '../assets/ft4.jpg';
import img3 from '../assets/ft5.jpg';

const HeroSection = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, );

  return (
    <section id="hero">
      <div className="hero-heading">
        <p className="data">26 · 07 · 2025</p>
      </div>

      <div className="hero-carousel desktop">
        <div className="carousel-track">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === 1 ? 'center' : ''}`}
            >
              <img src={img} alt={`Foto ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="hero-carousel mobile">
        <div className="carousel-track-mobile">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide-mobile ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={img} alt={`Foto ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
