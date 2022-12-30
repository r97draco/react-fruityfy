import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import createTheme from "@mui/material/styles/createTheme";
import AppNavBar from "./components/AppBar";
import { ThemeProvider } from "@mui/material";
import DisplayContent from "./components/DisplayContent";

const theme = createTheme({
  typography: {
    fontFamily: "bangers, cursive",
  },
});

const Zoom = () => {
  useEffect(() => {
    const initialValue = document.body.style.zoom;
    document.body.style.zoom = "120%";
    return () => {
      document.body.style.zoom = initialValue;
    };
  }, []);
  return <></>;
};

function App() {
  Zoom();
  const [name, setName] = React.useState("apple");
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
    await axios
      .get("http://localhost:8080/fruits/?fr=" + fruit_name)
      .then((res) => {
        setApiData(res.data);
        let jsonString = JSON.stringify(res.data);
        setJsonApi(JSON.parse(jsonString));
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    fetchData(name);
  }, [name]);

  const searchData = (data) => {
    if (data) {
      setName(data);
      fetchData(data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App" sx={{ innerHeight: "100vh" }}>
        <AppNavBar searchData={searchData} />
        {/* <SearchBar fetchData={fetchData} /> */}
        <DisplayContent apiData={apiData} jsonApi={jsonApi}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
