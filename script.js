
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weather-card");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showMessage("Please enter a city name.", true);
    return;
  }
  await getWeather(city);
});

async function getWeather(city) {
  searchButton.disabled = true;
  searchButton.textContent = "Loading...";
  showMessage(`Fetching weather for ${city}...`);
  weatherCard.hidden = true;

  try {
    const response = await fetch(
      `http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Check the spelling and try again.");
      }

      if (response.status === 401) {
        throw new Error("API key is invalid or not activated yet.");
      }

      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error(data.message || "Unable to fetch weather data.");
    }

    displayWeather(data);
    showMessage(`Weather updated for ${data.name}.`);
  } catch (error) {
    showMessage(
      error instanceof TypeError
        ? "Network error. Check your internet connection and try again."
        : error.message,
      true
    );
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Search";
  }
}

function displayWeather(data) {

  updateWeatherScene(data);
  loadCityPhoto(data.name, data.sys.country);

  document.getElementById("city-name").textContent =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("weather-description").textContent =
    data.weather[0].description;

  document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;

  document.getElementById("feels-like").textContent =
    `Feels like ${Math.round(data.main.feels_like)}°C`;

  document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

  document.getElementById("wind-speed").textContent =
    `${data.wind.speed} m/s`;

  document.getElementById("feels-detail").textContent =
    `${Math.round(data.main.feels_like)}°C`;

  const icon = document.getElementById("weather-icon");
  icon.src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;

  weatherCard.hidden = false;
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#ff9292" : "";
}


function updateWeatherScene(data) {
  const scene = document.getElementById("weather-scene");
  if (!scene) return;

  const condition = data.weather?.[0]?.main?.toLowerCase() || "";
  const description = data.weather?.[0]?.description?.toLowerCase() || "";
  const weatherId = Number(data.weather?.[0]?.id);
  const windSpeed = Number(data.wind?.speed || 0);

  scene.className = "weather-scene";

  // Choose a scene using OpenWeather's condition codes.
  if (weatherId >= 200 && weatherId < 300) {
    scene.classList.add("storm-scene", "rain-scene");
  } else if (
    weatherId >= 500 && weatherId < 600
  ) {
    scene.classList.add("rain-scene");

    // Stronger visual rain for higher-intensity conditions.
    if (weatherId === 502 || weatherId === 503 ||
      weatherId === 504 || weatherId === 522 ||
      weatherId === 531) {
      scene.classList.add("heavy-rain");
    }
  } else if (
    weatherId >= 600 && weatherId < 700 ||
    condition.includes("snow")
  ) {
    scene.classList.add("snow-scene");
  } else if (
    weatherId === 701 || weatherId === 741 ||
    description.includes("mist") ||
    description.includes("fog")
  ) {
    scene.classList.add("fog-scene");
  } else if (
    condition.includes("cloud") ||
    condition.includes("overcast")
  ) {
    scene.classList.add("cloudy-scene");
  } else {
    scene.classList.add("clear-scene");
  }

  // Strong wind makes rain streaks more slanted.
  if (windSpeed >= 8 && scene.classList.contains("rain-scene")) {
    scene.classList.add("windy-scene");
  }
}


async function loadCityPhoto(city, country) {
  const photoWrapper = document.getElementById("city-photo-wrapper");
  const photo = document.getElementById("city-image");
  const caption = document.getElementById("city-photo-caption");

  if (!photoWrapper || !photo || !caption) return;

  photoWrapper.hidden = true;

  try {
    const query = `${city} ${country} famous landmarks cityscape`;
    const url = `http://localhost:3000/api/city-photo?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City photo search failed");
    }

    const results = await response.json();

    if (!Array.isArray(results) || results.length === 0) {
      return;
    }

    // Prefer the first valid image returned by the service.
    const result = results.find(item =>
      typeof item.image_url === "string" &&
      item.image_url.startsWith("https://a12.click/")
    );

    if (!result) return;

    photo.onload = () => {
      caption.textContent = `${city}, ${country} · Cityscape`;
      photoWrapper.hidden = false;
      console.log("City photo displayed successfully.");
    };

    photo.onerror = () => {
      photoWrapper.hidden = true;
      console.error("City photo failed to load.");
    };

    photo.alt = result.caption || `View of ${city}, ${country}`;
    photo.loading = "eager";
    photo.src = result.image_url;
  } catch (error) {
    console.warn("Unable to load city photo:", error.message);
    photoWrapper.hidden = true;
  }
}
