
    //carousels/Responsive.js
    import React, { useState } from 'react';
    // import { Carousel } from 'react-bootstrap';
    import { Carousel } from "react-responsive-carousel";
    import "react-responsive-carousel/lib/styles/carousel.min.css";
    import Image from 'next/image';
    import '../style.css'
    // import styles from "../styles/Responsive.module.css";

    const MyCarousel = () => {
        const [currentSlide, setCurrentSlide] = useState(0);

        const handleOnSelect = (selectedIndex) => {
            setCurrentSlide(selectedIndex);
        };

   
    //   const { responsive } = items;
      return (
          <Carousel autoPlay
            interval={6000} 
            selectedItem={currentSlide}
            onChange={handleOnSelect}
            showArrows={true}
            showIndicators={true}
            infiniteLoop={true}
            dynamicHeight={false}
            dynamicWidth={true}
            showThumbs={false}
          >
            <div>
                <Image src="/images/imgrev1.png" width="650" height="2500" />
            </div>
            <div>
                <Image src="/images/imgrev2.png" width="650" height="2500" />   
            </div>
            <div>
                <Image src="/images/imgrev3.png" width="650" height="2500" />
            </div>
            <div>
                <img src="/images/wordcloud.png" className="wordcloud"/>
            </div>
          </Carousel>
      );
    }

    export default MyCarousel;

