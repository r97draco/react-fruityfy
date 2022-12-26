import * as React from "react";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import DisplayObject from "./components/DisplayObject";
import { PieChart } from 'react-minimal-pie-chart';


function App() {
  const [name, setName] = React.useState("apple");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const [apiData, setApiData] = useState();
  const fetchData = async (fruit_name) => {
    const res = await axios.get(
      "http://localhost:8080/fruits/?fr=" + fruit_name
    );
    setApiData(res.data);
    console.log(res.data);
  };
  const fetchRoot = async () => {
    const res = await axios.get("http://localhost:8080");
    setApiData(res.data);
    console.log(typeof res.data);
  };

  const Log = ({ data }) => (
    <pre>
      <code>{JSON.stringify(apiData, null, 2)}</code>
    </pre>
  );

  return (
    <div className="App">
      <Navbar />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 10, width: "25ch" },
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
      </Box>
      <Box flex={true} flexDirection={"row"} sx={{ mx: 10, width: "25ch" }}>
        <DisplayObject data={{ apiData }} />
        <PieChart
        data={[
          { title: 'One', value: 10, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Three', value: 20, color: '#6A2135' },
        ]}
      />
      </Box>
    </div>
  );
}

export default App;
