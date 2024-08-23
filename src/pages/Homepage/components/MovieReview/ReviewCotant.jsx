import React, { useState, useEffect } from "react";
import "./ReviewContant.style.css";
const ReviewContent = ({ author }) => {
  const [more, setMore] = useState(true);

  const displayContent = more ? author?.content : author?.content.slice(0, 500);
  const toggleMenu = () => {
    setMore(!more);
    console.log(more);
  };

  useEffect(() => {}, [more]); // content length가 바뀔 때만 실행

  return (
    <div className="review-container">
      <div>{author?.author}</div>
      <div>{displayContent}</div>
      <div>
        <div className="button" onClick={toggleMenu}>
          {more ? "접기" : "더보기"}
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;
