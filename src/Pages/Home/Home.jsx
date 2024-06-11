import React, { useEffect } from "react";
import TopBanner from "./TopBanner/TopBanner";
import ApartmentSection from "./ApartmentSection/ApartmentSection";

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
      <ApartmentSection></ApartmentSection>
    </div>
  );
};

export default Home;
