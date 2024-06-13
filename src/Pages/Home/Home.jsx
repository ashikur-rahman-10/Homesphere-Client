import React, { useEffect } from "react";
import TopBanner from "./TopBanner/TopBanner";
import ApartmentSection from "./ApartmentSection/ApartmentSection";
import Articles from "../Articles/Articles";

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
      <Articles />
    </div>
  );
};

export default Home;
