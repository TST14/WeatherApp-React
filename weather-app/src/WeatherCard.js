import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
export default function WeatherCard({
  name,
  region,
  icon,
  text,
  temp_c,
  temp_f,
  wind_kph,
  wind_dir,
  humidity,
  cloud,
  last_updated,
}) {
  let date = new Date(last_updated);
  let options = { day: "numeric", month: "long", year: "numeric" };
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {name}, {region}
      </Typography>
      <Card sx={{ minWidth: "67%" }}>
        <CardContent>
          <Stack direction="row" justifyContent="flex-start" spacing={2}>
            <img src={icon} alt={text} />
          </Stack>

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Temperature
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {temp_c}&#176;C/{temp_f}&deg;F
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Condition
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {text}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Wind Speed
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {wind_kph} km/h
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Wind Direction
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {wind_dir}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Humidity
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {humidity}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Cloud Coverage
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {cloud}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Last Updated
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {`${date.toLocaleString(
                "en-US",
                options
              )}, ${date.toLocaleTimeString("en-US")}`}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
