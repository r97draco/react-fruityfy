import React from "react";
import "../App.css";
import Brightness1Icon from "@mui/icons-material/Brightness1";

var json = {
  genus: "Rubus",
  name: "Blackberry",
  id: 64,
  family: "Rosaceae",
  order: "Rosales",
  nutritions: {
    carbohydrates: 9,
    protein: 1.3,
    fat: 0.4,
    calories: 40,
    sugar: 4.5,
  },
};

let colors = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];

const DisplayJson = ({ jsonData }) => {
  return (
    <div>
      <h2>{jsonData.name}</h2>
      <h3 className="display-object__key">
        Genus: <span className="display-object__value">{jsonData.genus}</span>
      </h3>
      <h3 className="display-object__key">
        Family: <span className="display-object__value">{jsonData.family}</span>
      </h3>
      <h3 className="display-object__key">
        Order: <span className="display-object__value">{jsonData.order}</span>
      </h3>
      <table style={{ gap: "2rem" }}>
        <thead>
          <tr>
            <th colSpan={3}>
              <h3 className="display-object__key">Nutritions</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="display-object__key">Carbohydrates</td>
            <td className="display-object__value">
              {jsonData.nutritions.carbohydrates}
            </td>
            <td>
              <Brightness1Icon sx={{ color: colors[0] }} />
            </td>
          </tr>
          <tr>
            <td className="display-object__key">Protein</td>
            <td className="display-object__value">
              {jsonData.nutritions.protein}
            </td>
            <td>
              <Brightness1Icon sx={{ color: colors[1] }} />
            </td>
          </tr>
          <tr>
            <td className="display-object__key">Fat</td>
            <td className="display-object__value">{jsonData.nutritions.fat}</td>
            <td>
              <Brightness1Icon sx={{ color: colors[2] }} />
            </td>
          </tr>
          <tr>
            <td className="display-object__key">Calories</td>
            <td className="display-object__value">
              {jsonData.nutritions.calories}
            </td>
            <td>
              <Brightness1Icon sx={{ color: colors[3] }} />
            </td>
          </tr>
          <tr>
            <td className="display-object__key">Sugar</td>
            <td className="display-object__value">
              {jsonData.nutritions.sugar}
            </td>
            <td>
              <Brightness1Icon sx={{ color: colors[4] }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DisplayJson;
