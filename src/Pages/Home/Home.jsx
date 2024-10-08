import React, { useEffect } from "react";
import TopBanner from "./TopBanner/TopBanner";
import ApartmentSection from "./ApartmentSection/ApartmentSection";
import Articles from "../Articles/Articles";
import GiveReview from "../Dashboard/UserDashboard/GiveReview/GiveReview";
import ReviewsPage from "../ReviewsPage/ReviewsPage";
import WhyChooseUs from "../WhyChooseUS/WhyChooseUs";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <TopBanner></TopBanner>
      <ApartmentSection />
      <WhyChooseUs />
      <ReviewsPage />
      <Articles />
      <div className="block">
        <GiveReview />
      </div>
    </div>
  );
};

export default Home;
