import axios from "axios";
import WeatherCard from "./WeatherCard.js";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";
export default function WeatherApp() {
  let [card, setCard] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [errCode, setErrCode] = useState(null);
  let [timer, setTimer] = useState(null);
  let [location, setLocation] = useState("");
  let performSearch = async (key, place) => {
    try {
      setLoading(true);
      let response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${place}&aqi=no`
      );
      setCard(response.data);
      setErrCode(0);
    } catch (err) {
      setCard("");
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.error.code === 1006
      ) {
        setError(err.response.data.error.message);
        setErrCode(err.response.data.error.code);
      } else if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.error.code === 1003
      ) {
        setErrCode(err.response.data.error.code);
        setError(err.response.data.error.message);
      }
    }
    setLoading(false);
  };
  //   console.log("Input Value", location);
  //   console.log("Error Code", errCode);
  //   console.log("Card Array", card);

  let debounceSearch = (e, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    let timerId = setTimeout(() => {
      performSearch("43f550d900884c94a41133945232712", e.target.value);
    }, 700);
    setTimer(timerId);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Typography variant="h6" gutterBottom>
            Weather App
          </Typography>
        </AppBar>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "77%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-read-only-input"
          label="Enter Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            debounceSearch(e, timer);
          }}
        />
      </Box>
      {loading === true ? (
        <div className="loading">
          <CircularProgress />
          <h5>Loading Weather...</h5>
        </div>
      ) : card !== "" || errCode === 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: 300,
          }}
        >
          <WeatherCard
            name={card.location.name}
            region={card.location.region}
            icon={card.current.condition.icon}
            text={card.current.condition.text}
            temp_c={card.current.temp_c}
            temp_f={card.current.temp_f}
            wind_kph={card.current.wind_kph}
            wind_dir={card.current.wind_dir}
            humidity={card.current.humidity}
            cloud={card.current.cloud}
            last_updated={card.current.last_updated}
          />
        </Stack>
      ) : errCode === null || errCode === 1003 ? (
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Alert severity="info" className="initial-alert">
            Nothing to show, Enter a location to show live weather
          </Alert>
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
    </div>
  );
}
