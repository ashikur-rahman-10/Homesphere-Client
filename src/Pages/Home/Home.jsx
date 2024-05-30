import React, { useEffect } from "react";
import TopBanner from "./TopBanner/TopBanner";

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
    </div>
  );
};

export default Home;
