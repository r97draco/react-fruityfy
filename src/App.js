import * as React from "react";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import DisplayObject from "./components/DisplayObject";
import { PieChart } from "react-minimal-pie-chart";
import DisplayJson from "./components/DisplayJson";
import createTheme from "@mui/material/styles/createTheme";
import AppNavBar from "./components/AppBar";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "bangers, cursive",
  },
});

const Zoom = () => {
  useEffect(() => {
    const initialValue = document.body.style.zoom;
    // Change zoom level on mount
    document.body.style.zoom = "120%";
    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);
  return <></>;
};

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

function App() {
  Zoom();

  const [name, setName] = React.useState("apple");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const [apiData, setApiData] = useState({});
  const [jsonApi, setJsonApi] = useState({
    genus: "Malus",
    name: "Apple",
    id: 6,
    family: "Rosaceae",
    order: "Rosales",
    nutritions: {
      carbohydrates: 11.4,
      protein: 0.3,
      fat: 0.4,
      calories: 52,
      sugar: 10.3,
    },
  });
  const fetchData = async (fruit_name) => {
    const res = await axios
      .get("http://localhost:8080/fruits/?fr=" + fruit_name)
      .then((res) => {
        setApiData(res.data);
        let jsonString = JSON.stringify(res.data);
        setJsonApi(JSON.parse(jsonString));
        console.log("jsonApi in fetch --> ", jsonApi);
        callOnClick(res.data);
      })
      .catch((err) => {
        callOnClick(tmpJson);
        console.log("Error: ", err);
      });
  };
  useEffect(() => {
    fetchData(name);
  }, []);
  const fetchRoot = async () => {
    const res = await axios.get("http://localhost:8080");
    setApiData(res.data);
  };

  //show the jsonAPI data beatifully

  var tmpJson = {
    genus: "Malus",
    name: "Apple",
    id: 6,
    family: "Rosaceae",
    order: "Rosales",
    nutritions: {
      carbohydrates: 11.4,
      protein: 0.3,
      fat: 0.4,
      calories: 52,
      sugar: 10.3,
    },
  };

  const [key, incrementKey] = useState(0);
  const [pieData, setPieData] = useState([
    { label: "No Data", title: "No Data", value: 1, color: "#E38627" },
  ]);
  const [totalSum, setTotalSum] = useState(100);
  function callOnClick(data) {
    var arr = pieData;
    var sum = 0;
    arr = funcPieData(data.nutritions)[0];
    sum = funcPieData(data.nutritions)[1];
    setPieData(arr);
    setTotalSum(sum);
    incrementKey(key + 1);
  }

  const searchData = (data) => {
    console.log("data in getSearchVal: ", data);
    if (data) {
      setName(data);
      fetchData(data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App" sx={{ innerHeight: "100vh" }}>
        {/* <Navbar /> */}
        <AppNavBar searchData={searchData} />

        {/* PREVIOUS SEARCH BAR */}

        {/* <Box
        component="form"
        sx={{
          "& > :not(style)": { mx: "3rem", my:"1.5rem", width: "25ch" , textAlign:"center"},
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Fruit Name"
          value={name}
          onChange={handleChange}
          onKeyPress={(ev) => {
            // console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter") {
              // Do code here
              fetchData(name);
              ev.preventDefault();
            }
          }}
        />
      </Box>  */}

        {/* OLD SEARCH BAR END  */}

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
          {/* 
        <Box flex={1} align='center'>

          {typeof { apiData } === "string" ? (
            <br></br>
          ) : (
            <DisplayObject data={apiData} />
          )}
        </Box> */}
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
      </div>
    </ThemeProvider>
  );
}

export default App;
