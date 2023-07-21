import React from 'react';
import Typewriter from 'typewriter-effect';
import { useState, useEffect, useRef } from 'react';
import collegesData from '../data/colleges.json';
// import summariesData from '../data/summaries.json';
import '../style.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import reviewsData from '../data/all.json'
import ratingsData from '../data/ratings.json'
import MyCarousel from '../Carousel/Responsive';
// import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';


const summariesFilePath = path.join(process.cwd(), 'data', 'summaries.json')


export default function Home({ summary }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [collegeSummary, setCollegeSummary] = useState('');
    const [suggestedColleges, setSuggestedColleges] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState('');
    const [isAdDisplayed, setIsAdDisplayed] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [selectedCollegeReviews, setSelectedCollegeReviews] = useState([]);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
    const [ratings, setRatings] = useState([]);
    const [selectedCollegeRatings, setSelectedCollegeRatings] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setSuggestedColleges([]);
    
        const filteredColleges = collegesData
        .filter((college) => college.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          const lowerCaseQuery = query.toLowerCase();
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();

          const aStartsWithQuery = aLower.startsWith(lowerCaseQuery);
          const bStartsWithQuery = bLower.startsWith(lowerCaseQuery);

          if (aStartsWithQuery && !bStartsWithQuery) {
            return -1; 
          }
          if (!aStartsWithQuery && bStartsWithQuery) {
            return 1; 
          }
          return a.localeCompare(b); 
        });
        setSuggestedColleges(filteredColleges);
      };
  
    const handleSearchSubmit = async (event) => {
      event.preventDefault();
      setSelectedCollege(searchQuery);
      setCollegeSummary('');
      setSuggestedColleges([]);
      router.push(`/?college=${encodeURIComponent(searchQuery)}`);
      
      if (selectedCollege) {
          setIsLoading(true);
          setCollegeSummary(summary && summary.Summary ? summary.Summary : 'Summary not found.');
          setTimeout(() => {
            
            setIsLoading(false); // Stop loading
            setShowSummary(true);
          }, 1000);
      } else {
        setShowSummary(true);
        setSearchClicked(false);
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
    
    const handleShowSummary = async () => {
      try {
        const response = await fetch(`/api/summary?college=${selectedCollege}`);
        const data = await response.json();
        const collegeSummary = data.summary;
        setCollegeSummary(collegeSummary);
        setIsSummaryVisible(true);
      } catch (error) {
        console.error("ERROR");
      }
    };
    const handleCloseSummary = () => {
      setIsSummaryVisible(false);
    };

    const scrollToBottom = () => {
      setTimeout(() =>
      {scrollRef.current?.scrollIntoView({ behavior: "smooth" })},2
      );
      }

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
        setTimeout(() => {
         scrollToBottom()
        },1100);
        }, [clickCount]);
      
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
                  {suggestedColleges.slice(0, 25).map((college) => (
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
              {isLoading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Reviewing...</p>
              </div>
            )}
            </div>
            <div className="carousel-container">
              <MyCarousel />
            </div>
            
          </div>
            {selectedCollege && collegeSummary && !isLoading && (
              <div ref={scrollRef} className={`result-container ${showSummary ? 'show' : ''}`}>
                <button className="summary-button" onClick={handleShowSummary}>
                  CLICK to view ChatGPT's Review
                </button>
                {isSummaryVisible && (
                  <div className="popup-overlay active">
                    
                    <div className="popup active">
                      <h2 className="popup-heading">Review</h2>
                      
                      {collegeSummary && collegeSummary.Summary ? (
                        <p className="popup-content">{collegeSummary.Summary}</p>
                      ) : (
                        <p className="popup-content">Summary not found.</p>
                      )}

                      {Object.keys(collegeSummary).length > 0 && (
            <div className="attributes-container">
                <h3 className="attributes-heading">Ratings</h3>
                <div className="attribute-buttons">
                {Object.entries(collegeSummary)
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
                    {collegeSummary[selectedAttribute] && (
                        <p className="attribute-value">ChatGPT's rating for {selectedAttribute} is :<br></br><b>{collegeSummary[selectedAttribute]}</b></p>
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
                  <p className='review-header'>Some reviews may be redundant due to user uploading the same review multiple times. Some ChatGPT reviews are larger than others</p>
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
          <div style={{ marginBottom: 100}} ref={scrollRef} />
        </div>
        
      );
}      

export async function getServerSideProps(context) {
  const { college } = context.query;

  try {
    const response = await fetch(`http://localhost:3000/api/summary?college=${college}`);
    const summary = await response.json();

    return {
      props: {
        selectedCollege: college || '',
        summary: summary || {},
      },
    };
  } catch (error) {
    console.error('Error fetching summary data:', error);
    return {
      props: {
        selectedCollege: college || '',
        summary: {},
      },
    };
  }
}