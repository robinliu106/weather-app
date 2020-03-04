const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/7f498c62648dbcd12565e645159a9b8a/" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to GeoCode services", undefined);
    } else if (error) {
      callback("Unable to find forecast. Try another search");
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ". It is currently " +
          body.currently.temperature +
          " Degrees (F). There is a " +
          body.daily.data[0].precipProbability +
          "% chance of rain. The high is " +
          body.daily.data[0].temperatureMax +
          " and the low is " +
          body.daily.data[0].temperatureMin +
          "."
      );
    }
  });
};

module.exports = forecast;
