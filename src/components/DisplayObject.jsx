import React, { Component } from "react";
import "../App.css";


export const DisplayObject = ({data}) => {


  return (
    <div>
      <ul className="display-object">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="display-object__item">
            <span className="display-object__key">{key}:</span>{" "}
            {typeof value === "object" ? (
              <DisplayObject data={value} />
            ) : (
              <span className="display-object__value">{value}</span>
            )}
          </li>
        ))}
      </ul>
      </div>
  );
}

export default DisplayObject;