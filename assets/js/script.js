//Catch the inputs and store them in variables
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "77a60fde9123837e97948e31963ac6dd";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

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

    for (let i = 0; i < 40; i++) {
      let date = data.list[i].dt_txt;
      date = date.split(" ")[0];
      if (!dataInfo.includes(date)) {
        dataInfo.push(
          data.city.name,
          date,
          data.list[i].wind.speed,
          data.list[i].main.temp,
          data.list[1].main.humidity
        );
      }
    }

    console.log(dataInfo);

    displayMainCard(
      dataInfo[0],
      dataInfo[1],
      dataInfo[2],
      dataInfo[3],
      dataInfo[4]
    );
  }

  function displayMainCard(name, date, wind, temp, hum) {
    card.textContent = "";
    card.style.display = "flex";
    //HTML Elements on the class card.
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = name;
    // tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(
      1
    )}°F`;
    humidityDisplay.textContent = `Humidity: ${hum}%`;
    // descDisplay.textContent = description;
    // weatherEmoji.textContent = getWeatherEmoji("500");

    //Add css class
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    // weatherEmoji.classList.add("weatherEmoji");

    //Append to next child
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    // card.appendChild(weatherEmoji);
  }

  // }

  // //Emoji function using weather code for each emoji
  // function getWeatherEmoji(weatherId) {
  //   switch (true) {
  //     case weatherId >= 200 && weatherId < 300:
  //       return "⛈️";
  //     case weatherId >= 300 && weatherId < 400:
  //       return "🌧️";
  //     case weatherId >= 500 && weatherId < 600:
  //       return "🌦️";
  //     case weatherId >= 600 && weatherId < 700:
  //       return "❄️";
  //     case weatherId >= 700 && weatherId < 800:
  //       return "🌁";
  //     case weatherId === 800:
  //       return "☀️";
  //     case weatherId >= 801 && weatherId < 810:
  //       return "☁️";
  //     default:
  //       return "❓";
  //   }
  // }

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
