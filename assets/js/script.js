//Catch the inputs and store them in variables
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "77a60fde9123837e97948e31963ac6dd";

// Variables for 5 days of forecast
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

//Variables for historic of 5 latest cities.
const historic1 = document.querySelector(".city1");
const historic2 = document.querySelector(".city2");
const historic3 = document.querySelector(".city3");
const historic4 = document.querySelector(".city4");
const historic5 = document.querySelector(".city5");

const historicCities = [];

//Fire up the app right after clicked on submit button (Get Weather Button)
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Get the city input on the field City
  const city = cityInput.value;

  if (city) {
    try {
      //Call function getWeatherDataGeo to get the latitute and longitute of the city
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

//Function to get the latitute and Longitude of the city.
async function getWeatherDataGeo(city) {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  //Stored on the LocalStorage the cities input.
  const historic = {
    cityHistoric: city,
  };

  localStorage.setItem("historic", JSON.stringify(historic));

  //store in an array the cities in the localStorage to use on the historic cities searched weather
  historicCities.push(historic.cityHistoric);

  //If there is no issue return json
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

//Function to get the weather of the city using the latitute and longitude
async function displayWeatherInfoGeo(dataGeo) {
  //Storing the data such city names, latitute and longitude
  const name = dataGeo[0].name;
  const latitute = dataGeo[0].lat;
  const longitude = dataGeo[0].lon;

  try {
    //Call Api to get the weather data using latitute, longitude
    const weatherData = await getWeatherData(name, latitute, longitude);
    displayWeatherInfo(weatherData);
  } catch (error) {
    console.log(error);
    displayError(error);
  }

  //Api Call with lon and lat.
  async function getWeatherData(namecity, lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }

    return await response.json();
  }

  //Call the function to display data on UI.
  function displayWeatherInfo(data) {
    const dataInfo = [];

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

    console.log(historicCities);

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

  //Function to display data on the main card on the UI
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
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(
      1
    )}°F`;

    humidityDisplay.textContent = `Humidity: ${hum}%`;
    windDisplay.textContent = `Wind: ${wind}`;
    dateDisplay.textContent = `Date: ${date}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    historic1.textContent = historicCities[0];
    historic2.textContent = historicCities[1];
    historic3.textContent = historicCities[2];
    historic4.textContent = historicCities[3];
    historic5.textContent = historicCities[4];

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

    cityDisplay.textContent = "";
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

  //Function to display data on the cards for 5 days forecast
  function displayMainCardsItems(weatherDataItems) {
    console.log(weatherDataItems);

    dateCard1.textContent = weatherDataItems[1];
    windCard1.textContent = `Wind: ${weatherDataItems[2]}`;
    tempCard1.textContent = `${(
      (weatherDataItems[3] - 273.15) * (9 / 5) +
      32
    ).toFixed(1)}°F`;
    humCard1.textContent = `Humidity: ${weatherDataItems[4]}%`;

    dateCard2.textContent = weatherDataItems[7];
    windCard2.textContent = `Wind: ${weatherDataItems[8]}`;
    tempCard2.textContent = `${(
      (weatherDataItems[9] - 273.15) * (9 / 5) +
      32
    ).toFixed(1)}°F`;
    humCard2.textContent = `Humidity: ${weatherDataItems[10]}%`;

    dateCard3.textContent = weatherDataItems[13];
    windCard3.textContent = `Wind: ${weatherDataItems[14]}`;
    tempCard3.textContent = `${(
      (weatherDataItems[15] - 273.15) * (9 / 5) +
      32
    ).toFixed(1)}°F`;
    humCard3.textContent = `Humidity: ${weatherDataItems[16]}%`;

    dateCard4.textContent = weatherDataItems[19];
    windCard4.textContent = `Wind: ${weatherDataItems[20]}`;
    tempCard4.textContent = `${(
      (weatherDataItems[21] - 273.15) * (9 / 5) +
      32
    ).toFixed(1)}°F`;
    humCard4.textContent = `Humidity: ${weatherDataItems[22]}%`;

    dateCard5.textContent = weatherDataItems[25];
    windCard5.textContent = `Wind: ${weatherDataItems[26]}`;
    tempCard5.textContent = `${(
      (weatherDataItems[27] - 273.15) * (9 / 5) +
      32
    ).toFixed(1)}°F`;
    humCard5.textContent = `Humidity: ${weatherDataItems[28]}%`;
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
