import React from 'react';
import Typewriter from 'typewriter-effect';
import { useState, useEffect, useRef } from 'react';
import collegesData from '../data/colleges.json';
import summariesData from '../data/summaries.json';
import '../style.css'
import Head from 'next/head';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import reviewsData from '../data/all.json'
import ratingsData from '../data/ratings.json'
import Script from 'next/script';
// import ResponsiveCarousel from "../Carousel/Responsive";
import MyCarousel from '../Carousel/Responsive';
// import AdScript from './ad';


export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [collegeSummary, setCollegeSummary] = useState('');
    const [collegeAttributes, setCollegeAttributes] = useState({});
    const [suggestedColleges, setSuggestedColleges] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState('');
    const [isAdDisplayed, setIsAdDisplayed] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [selectedCollegeReviews, setSelectedCollegeReviews] = useState([]);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectedCollegeRatings, setSelectedCollegeRatings] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const scrollRef = useRef(null);


    useEffect(() => {
      // Fetch the reviews data from the JSON file or an API
      setReviews(reviewsData);
    }, []);

    useEffect(() => {
      // Fetch the reviews data from the JSON file or an API
      setRatings(ratingsData);
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setSelectedCollege('');
        setCollegeSummary('');
        setCollegeAttributes({});
        setSuggestedColleges([]);
    
        const filteredColleges = collegesData.filter((college) =>
          college.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestedColleges(filteredColleges);
      };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();

      if (clickCount === 1) {
        setIsAdDisplayed(true);
      }
      
      if (selectedCollege) {
        setIsLoading(true); // Start loading
        setCollegeSummary('');
        setCollegeAttributes({});
        setTimeout(() => {
          const summary = summariesData[selectedCollege];
          setCollegeSummary(summary && summary.Summary ? summary.Summary : 'Summary not found.');
          setCollegeAttributes(summary || {});
          setIsLoading(false); // Stop loading
          setShowSummary(true);
        }, 2000); // Delay for 2 seconds
      } else {
        setCollegeSummary('');
        setCollegeAttributes({});
        setShowSummary(true);
      }
      const foundCollege = Object.keys(reviews).find((college) => college.toLowerCase() === searchQuery.toLowerCase());
      setSelectedCollege(foundCollege);
      setSelectedCollegeReviews(reviews[foundCollege] || []);
      setSelectedCollegeRatings(ratings[foundCollege] || []);
      setSearchClicked(true);
      setClickCount(clickCount + 1);
    };
    const handleAttributeButtonClick = (attribute) => {
        setSelectedAttribute(attribute);
      };
    const handleSuggestionClick = (college) => {
      setSearchQuery(college);
      setSelectedCollege(college);
    };
    const handleShowSummary = () => {
      setIsSummaryVisible(true);
    };
  
    const handleCloseSummary = () => {
      setIsSummaryVisible(false);
    };


    useEffect(() => {
      setShowSummary(false);
    }, [searchQuery]);

    useEffect(() => {
        // Retrieve click count from localStorage on component mount
        const storedClickCount = localStorage.getItem('clickCount');
        if (storedClickCount) {
          setClickCount(parseInt(storedClickCount));
        }
      }, []);
    
      useEffect(() => {
        // Store click count in localStorage whenever it changes
        localStorage.setItem('clickCount', clickCount.toString());
      }, [clickCount]);

      
      useEffect(() => {
        // Scroll to the search results after the loading is done
        if (!isLoading && searchResults.length > 0 && scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [isLoading, searchResults]);
      
      return (
        <div className={`container ${searchClicked ? 'responsive' : ''}`}>
          <div className="logo-container">
            <img src="https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png" alt="ChatGPT Logo" className="logo" />
            <h1 className="heading" >ChatGPT Reviews</h1>
            </div>
            <p className='desc-1'>
Discover top colleges based on real user reviews. ChatGPT's ratings reflect hundreds of experiences for informed choices.</p>
          <p className="description">Get to know...</p>
          <Typewriter
            options={{
              strings: ['What ChatGPT has to say...', 'About a college.'],
              autoStart: true,
              loop: true,
            }}
          />
          <div className="content-container">
            <div className="search-container">
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <div className="input-container">
                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for a college..."
                  />
                  <button type="submit" className="search-button">
                    <i className="fas fa-search"></i> Search
                  </button>
                </div>
              </form>
              {searchQuery && suggestedColleges.length > 0 && (
                <div className="suggestions-container">
                  {suggestedColleges.slice(0, 20).map((college) => (
                    <div
                      key={college}
                      className="suggestion"
                      onClick={() => handleSuggestionClick(college)}
                    >
                      {college}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="carousel-container">
              <MyCarousel />
            </div>
            
          </div>
          {isLoading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading...</p>
              </div>
            )}
            {selectedCollege && collegeSummary && !isLoading && (
              <div ref={scrollRef} className={`result-container ${showSummary ? 'show' : ''}`}>
                <button className="summary-button" onClick={handleShowSummary}>
                  CLICK to view ChatGPT's Review
                </button>
                {isSummaryVisible && (
                  <div className="popup-overlay active">
                    
                    <div className="popup active">
                      <h2 className="popup-heading">Review</h2>
                      
                      <p className="popup-content">
                        {collegeSummary}
                      </p>
                      {Object.keys(collegeAttributes).length > 0 && (
            <div className="attributes-container">
                <h3 className="attributes-heading">Ratings</h3>
                <div className="attribute-buttons">
                {Object.entries(collegeAttributes)
                    .filter(([key]) => key !== 'Summary')
                    .map(([attribute, value]) => (
                    <button
                        key={attribute}
                        className="attribute-button"
                        onClick={() => handleAttributeButtonClick(attribute)}
                    >
                        {attribute}
                    </button>
                    ))}
                    </div>
                    <div className="attribute-content">
                    {collegeAttributes[selectedAttribute] && (
                        <p className="attribute-value">{collegeAttributes[selectedAttribute]}</p>
                    )}
                    </div>
                </div>  
                )}
                      <button className="popup-close-button" onClick={handleCloseSummary}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
              <div className="final-container">
                <div className="reviews-container">
                  <h3 className='review-header'>Some User Reviews</h3>
                  {selectedCollegeReviews.slice(0, 5).map((review, reviewIndex) => (
                    
                    <div key={reviewIndex} className="review">
                      <div className="user-logo-container">
                          <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="User Logo" className="user-logo" />
                      </div>
                      <div className="review-content">{review}</div>
                    </div>
                  ))}
                </div>
                <div className="rating-container">
                  {selectedCollegeRatings.slice(0, 5).map((rating, ratingIndex) => (
                    
                    <div key={ratingIndex} className="rating">
                      <div className="rating-content">{rating}</div>
                    </div>
                  ))}
                </div>
                
              </div>
              </div>
              
            )}

        </div>
        
      );
}      