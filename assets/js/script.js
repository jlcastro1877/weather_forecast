//Catch the inputs and store them in variables
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "77a60fde9123837e97948e31963ac6dd";

const cityCard1 = document.querySelector(".cityCard1");
const tempCard1 = document.querySelector(".tempCard1");
const humCard1 = document.querySelector(".humCard1");
const windCard1 = document.querySelector(".windCard1");
const dateCard1 = document.querySelector(".dateCard1");

const cityCard2 = document.querySelector(".cityCard2");
const tempCard2 = document.querySelector(".tempCard2");
const humCard2 = document.querySelector(".humCard2");
const windCard2 = document.querySelector(".windCard2");
const dateCard2 = document.querySelector(".dateCard2");

const cityCard3 = document.querySelector(".cityCard3");
const tempCard3 = document.querySelector(".tempCard3");
const humCard3 = document.querySelector(".humCard3");
const windCard3 = document.querySelector(".windCard3");
const dateCard3 = document.querySelector(".dateCard3");

const cityCard4 = document.querySelector(".cityCard4");
const tempCard4 = document.querySelector(".tempCard4");
const humCard4 = document.querySelector(".humCard4");
const windCard4 = document.querySelector(".windCard4");
const dateCard4 = document.querySelector(".dateCard4");

const cityCard5 = document.querySelector(".cityCard5");
const tempCard5 = document.querySelector(".tempCard5");
const humCard5 = document.querySelector(".humCard5");
const windCard5 = document.querySelector(".windCard5");
const dateCard5 = document.querySelector(".dateCard5");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // cityCard1.textContent = `Temperatura1`;
  const city = cityInput.value;

  if (city) {
    try {
      const weatherDataGeo = await getWeatherDataGeo(city);
      displayWeatherInfoGeo(weatherDataGeo);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city.");
  }
});

async function getWeatherDataGeo(city) {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

async function displayWeatherInfoGeo(dataGeo) {
  const name = dataGeo[0].name;
  const latitute = dataGeo[0].lat;
  const longitude = dataGeo[0].lon;

  try {
    const weatherData = await getWeatherData(name, latitute, longitude);
    displayWeatherInfo(weatherData);
  } catch (error) {
    console.log(error);
    displayError(error);
  }

  async function getWeatherData(namecity, lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }

    return await response.json();
  }

  function displayWeatherInfo(data) {
    const dataInfo = [];

    console.log(data);
    console.log(data.list[0].weather[0].id);

    for (let i = 0; i < 40; i++) {
      let date = data.list[i].dt_txt;
      date = date.split(" ")[0];

      if (!dataInfo.includes(date)) {
        dataInfo.push(
          data.city.name,
          date,
          data.list[i].wind.speed,
          data.list[i].main.temp,
          data.list[i].main.humidity,
          data.list[i].weather[0].id
        );
      }
    }

    displayMainCard(
      dataInfo[0],
      dataInfo[1],
      dataInfo[2],
      dataInfo[3],
      dataInfo[4],
      dataInfo[5]
    );

    displayMainCardsItems(dataInfo);
  }

  function displayMainCard(name, date, wind, temp, hum, id) {
    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const windDisplay = document.createElement("p");
    const dateDisplay = document.createElement("p");

    const displayCityCard1 = document.createElement("p");

    cityDisplay.textContent = name;
    // tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(
      1
    )}°F`;

    humidityDisplay.textContent = `Humidity: ${hum}%`;
    windDisplay.textContent = `Wind: ${wind}`;
    dateDisplay.textContent = `Date: ${date}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    //Add css class
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    windDisplay.classList.add("windDisplay");
    dateDisplay.classList.add("dateDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    //Append to next child
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(windDisplay);
    card.appendChild(dateDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
  }

  // //Emoji function using weather code for each emoji
  function getWeatherEmoji(weatherId) {
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        return "⛈️";
      case weatherId >= 300 && weatherId < 400:
        return "🌧️";
      case weatherId >= 500 && weatherId < 600:
        return "🌦️";
      case weatherId >= 600 && weatherId < 700:
        return "❄️";
      case weatherId >= 700 && weatherId < 800:
        return "🌁";
      case weatherId === 800:
        return "☀️";
      case weatherId >= 801 && weatherId < 810:
        return "☁️";
      default:
        return "❓";
    }
  }

  function displayMainCardsItems(weatherDataItems) {
    console.log("entrou nos items cards");
    console.log(weatherDataItems);

    // name, date, wind, temp, hum, id

    cityCard1.textContent = weatherDataItems[6]; //Name
    dateCard1.textContent = weatherDataItems[7]; //Date
    windCard1.textContent = weatherDataItems[8]; //Wind
    tempCard1.textContent = `${
      //Temp
      ((weatherDataItems[9] - 273.15) * (9 / 5) + 32).toFixed(1)
    }°F`;
    humCard1.textContent = weatherDataItems[10];

    cityCard2.textContent = weatherDataItems[12]; //Name
    dateCard2.textContent = weatherDataItems[13]; //Date
    windCard2.textContent = weatherDataItems[14]; //Wind
    tempCard2.textContent = `${
      //Temp
      ((weatherDataItems[15] - 273.15) * (9 / 5) + 32).toFixed(1)
    }°F`;
    humCard2.textContent = weatherDataItems[16];

    cityCard3.textContent = weatherDataItems[18]; //Name
    dateCard3.textContent = weatherDataItems[19]; //Date
    windCard3.textContent = weatherDataItems[20]; //Wind
    tempCard3.textContent = `${
      //Temp
      ((weatherDataItems[21] - 273.15) * (9 / 5) + 32).toFixed(1)
    }°F`;
    humCard3.textContent = weatherDataItems[22];

    cityCard4.textContent = weatherDataItems[24]; //Name
    dateCard4.textContent = weatherDataItems[25]; //Date
    windCard4.textContent = weatherDataItems[26]; //Wind
    tempCard4.textContent = `${
      //Temp
      ((weatherDataItems[27] - 273.15) * (9 / 5) + 32).toFixed(1)
    }°F`;
    humCard4.textContent = weatherDataItems[28];

    cityCard5.textContent = weatherDataItems[30]; //Name
    dateCard5.textContent = weatherDataItems[31]; //Date
    windCard5.textContent = weatherDataItems[32]; //Wind
    tempCard5.textContent = `${
      //Temp
      ((weatherDataItems[33] - 273.15) * (9 / 5) + 32).toFixed(1)
    }°F`;
    humCard5.textContent = weatherDataItems[34];
  }

  //If I got some error I display it to the user.
  function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
  }
}
