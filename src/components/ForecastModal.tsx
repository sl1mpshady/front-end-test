import React from "react";
import ReactDOM from "react-dom";

import ForecastContent from "./ForecastContent";

const ForecastPopup = () => {
  return ReactDOM.createPortal(
    <ForecastContent />,
    document.getElementById("root") as Element
  );
};

export default ForecastPopup;
