import React from "react";

const RatingStar = ({ rating }) => {
  const { rate, count } = rating
  const percentage = (rate / 5) * 100;

  return (
    <div className="rating-container">
      <div className="flex gap-x-2">
        <span>{rate}</span>
        {/* Display the stars based on the rating */}
        <div>
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <span
              key={starNumber}
              className={
                starNumber <= rate ? "star text-yellow-500" : "star"
              }
            >
              ★
            </span>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {count} reviews
        </p>
      </div>
    </div>
  );
};

export default RatingStar;
