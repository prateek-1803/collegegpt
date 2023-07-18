
    //carousels/Responsive.js
    import React, { useState } from 'react';
    // import { Carousel } from 'react-bootstrap';
    import { Carousel } from "react-responsive-carousel";
    import "react-responsive-carousel/lib/styles/carousel.min.css";
    // import styles from "../styles/Responsive.module.css";

    const MyCarousel = () => {
        const [currentSlide, setCurrentSlide] = useState(0);

        const handleOnSelect = (selectedIndex) => {
            setCurrentSlide(selectedIndex);
        };

   
    //   const { responsive } = items;
      return (
          <Carousel autoPlay
            interval={7000} 
            selectedItem={currentSlide}
            onChange={handleOnSelect}
            showArrows={true}
            showIndicators={true}
            infiniteLoop={true}
            dynamicHeight={false}
            showThumbs={false}
          >
            <div>
                <img src="https://i.ibb.co/7GVmztw/Top-5.jpg" alt="Top 5" class="carousel-image" />
            </div>
            <div>
                <img src="https://i.ibb.co/z7tPZmM/highest-reviews.png" alt="Hishest_Reviews" class="carousel-image"/>
            </div>
            <div>
                <img src="https://i.ibb.co/3kq5Bsd/wordcloud.png" alt="Hishest_Reviews" class="carousel-image"/>
            </div>
          </Carousel>
      );
    }

    export default MyCarousel;

