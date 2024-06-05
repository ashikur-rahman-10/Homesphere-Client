import React from "react";
import { LineWave } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        render(
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#00d7c0"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
        )
      </div>
    </div>
  );
};

export default CustomLoader;
