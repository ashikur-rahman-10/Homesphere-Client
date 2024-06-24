import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApartmentCardSkeleton = () => {
  return (
    <div className="shadow-lg rounded-2xl lg:w-80 w-full">
      <Skeleton height={192} className="rounded-t-2xl" />
      <div className="p-4">
        <Skeleton width={200} height={20} className="mb-2" />
        <Skeleton width={150} height={15} />
        <div className="text-sm flex justify-between py-3 font-semibold text-gray-500">
          <Skeleton width={50} height={15} />
          <Skeleton width={50} height={15} />
          <Skeleton width={50} height={15} />
          <Skeleton width={50} height={15} />
          <Skeleton width={50} height={15} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton circle width={32} height={32} />
            <Skeleton width={50} height={15} />
          </div>
          <Skeleton width={70} height={20} />
        </div>
      </div>
    </div>
  );
};

export default ApartmentCardSkeleton;
