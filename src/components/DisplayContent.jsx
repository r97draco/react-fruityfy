import * as React from "react";
import Box from "@mui/material/Box";
import "../App.css";
import { PieChart } from "react-minimal-pie-chart";
import DisplayJson from "./DisplayJson";

const DisplayContent = (props) => {
  const apiData = props.apiData;
  const jsonApi = props.jsonApi;

  const [pieData, totalSum] = funcPieData(jsonApi.nutritions);
  const key = Math.random();

  return (
    <Box
      display={"flex"}
      flex={true}
      flexDirection="row"
      justifyItems={"center"}
      sx={{ px: "2rem", flexDirection: { xs: "column", md: "row" } }}
    >
      <Box flex={1} className={"fruit-info"}>
        {apiData.length === 0 ? (
          <h1 className="error">Error 404</h1>
        ) : (
          <DisplayJson jsonData={jsonApi} />
        )}
      </Box>

      <Box
        flex={2}
        sx={{
          alignContent: "center",
          textAlign: "center",
          justifyItems: "left",
        }}
        className={"pie-chart"}
      >
        {apiData.length === 0 ? (
          <h1 className="error">Error 404</h1>
        ) : (
          <h2>Nutritions Data</h2>
        )}
        <PieChart
          viewBoxSize={["210", "100"]}
          key={key}
          style={{ maxHeight: "50rem", maxWidth: "45rem" }}
          center={[100, 40]}
          maxSize={20}
          animationDuration={500}
          isAnimationActive={false}
          animate
          renderSectorsWithAnimation={true}
          animationEasing="ease-out"
          data={pieData}
          label={({ dataEntry }) =>
            dataEntry.title + " " + dataEntry.realValue + "%"
          }
          totalValue={totalSum}
          labelPosition={107}
          radius={40}
          labelStyle={{
            fontSize: ".5rem",
            className: "pie-label",
            textTransform: "capitalize",
          }}
        />
      </Box>
    </Box>
  );
};

export default DisplayContent;

function funcPieData(data = {}) {
  let pieData = [];
  let colors = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];
  let i = 0;
  var sum = 0;
  for (var key in data) {
    let value = data[key];
    if (value < 10) value = value + 10;
    pieData.push({
      realValue: data[key],
      title: key,
      value: value,
      color: colors[i],
    });
    sum += value;
    i++;
  }
  return [pieData, sum];
}
