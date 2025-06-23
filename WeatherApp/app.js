const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Dark Weather App</title>
        <style>
          body {
            background-color: #121212;
            color: #ffffff;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            margin-bottom: 20px;
          }
          form {
            background-color: #1e1e1e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.5);
          }
          input[type="text"] {
            padding: 10px;
            border: none;
            border-radius: 5px;
            margin-right: 10px;
            background-color: #2e2e2e;
            color: white;
            width: 200px;
          }
          button {
            padding: 10px 15px;
            background-color: #03dac5;
            border: none;
            border-radius: 5px;
            color: #000;
            font-weight: bold;
            cursor: pointer;
          }
          button:hover {
            background-color: #018786;
          }
        </style>
      </head>
      <body>
        <h1>🌙 Dark Weather App</h1>
        <form action="/" method="post">
          <input type="text" name="city" placeholder="Enter city name" required/>
          <button type="submit">Get Weather</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  const city = req.body.city;
  const apiKey = "41de6271fa71e5588cebc9255e93bf91";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const weatherData = JSON.parse(data);

      if (weatherData.cod === 200) {
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const desc = weatherData.weather[0].description;

        res.send(`
          <html>
            <head>
              <title>Weather in ${city}</title>
              <style>
                body {
                  background-color: #121212;
                  color: #ffffff;
                  font-family: Arial, sans-serif;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                }
                h1 {
                  margin-bottom: 10px;
                }
                p {
                  margin: 5px 0;
                }
                a {
                  color: #03dac5;
                  margin-top: 15px;
                  text-decoration: none;
                }
                a:hover {
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <h1>Weather in ${city}</h1>
              <p>🌡️ Temperature: ${temp} °C</p>
              <p>💧 Humidity: ${humidity}%</p>
              <p>☁️ Condition: ${desc}</p>
              <a href="/">🔙 Search again</a>
            </body>
          </html>
        `);
      } else {
        res.send(`
          <html>
            <head>
              <title>City Not Found</title>
              <style>
                body {
                  background-color: #121212;
                  color: #ffffff;
                  font-family: Arial, sans-serif;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                }
                a {
                  color: #03dac5;
                  margin-top: 15px;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <h1>City not found 😓</h1>
              <a href="/">🔙 Try again</a>
            </body>
          </html>
        `);
      }
    });
  }).on('error', (err) => {
    console.error("Error fetching weather:", err.message);
    res.send("Something went wrong.");
  });
});

app.listen(port, () => {
  console.log(`🌐 Express app running at http://localhost:${port}`);
});
