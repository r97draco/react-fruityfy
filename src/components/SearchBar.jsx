import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBar = (props) => {
  const [name, setName] = React.useState("");
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          mx: "3rem",
          my: "1.5rem",
          width: "25ch",
          textAlign: "center",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Fruit Name"
        value={name}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            props.fetchData(ev.target.value);
            ev.preventDefault();
          }
        }}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </Box>
  );
};

export default SearchBar;
