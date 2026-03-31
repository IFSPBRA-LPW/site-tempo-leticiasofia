import { API_KEY } from "./config.js";

async function fetchWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=en`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return await response.json();
}

function formatData(data) {
  return {
    city: data.location.name,
    country: data.location.country,
    date: data.location.localtime,

    temperature: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    humidity: data.current.humidity,
    wind: data.current.wind_kph,
    precipitation: data.current.precip_mm,

    daily: data.forecast.forecastday.map(day => ({
      day: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c
    })),

    hourly: data.forecast.forecastday[0].hour.map(hour => ({
      time: hour.time.split(" ")[1],
      temp: hour.temp_c
    }))
  };
}

function renderBannerInfo(data) {
  document.getElementById("city").textContent =
    `${data.city}, ${data.country}`;

  document.getElementById("date").textContent = data.date;

  document.getElementById("temperatura-principal").textContent =
    data.temperature + "°";
}

function renderDayInfo(data) {
  document.getElementById("feels").textContent = data.feelsLike + "°";
  document.getElementById("humidity").textContent = data.humidity + "%";
  document.getElementById("wind").textContent = data.wind + " km/h";
  document.getElementById("rain").textContent = data.precipitation + " mm";
}

function renderDaily(dailyData) {
  const container = document.getElementById("daily");
  container.innerHTML = '<p class="titulo-secao">Daily Forecast</p>';

  dailyData.forEach(day => {
    const section = document.createElement("section");

    section.innerHTML = `
      <p>${day.day}</p>
      <p>${day.max}° / ${day.min}°</p>
    `;

    container.appendChild(section);
  });
}

function renderHourly(hourlyData) {
  const container = document.getElementById("hourly");
  container.innerHTML = '<p class="titulo-secao">Hourly forecast</p>';

  hourlyData.forEach(hour => {
    const li = document.createElement("li");
    li.classList.add("forecast-item");

    li.textContent = `${hour.time} - ${hour.temp}°`;

    container.appendChild(li);
  });
}
function orchestrator(data) {
  renderBannerInfo(data);
  renderDayInfo(data);
  renderDaily(data.daily);
  renderHourly(data.hourly);
}

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.querySelector("input").value;

  try {
    const apiData = await fetchWeather(city);
    const formatted = formatData(apiData);

    orchestrator(formatted);
  } catch (error) {
    alert("Cidade não encontrada");
    console.error(error);
  }
});

fetchWeather("Berlin")
  .then(data => {
    const formatted = formatData(data);
    orchestrator(formatted);
  })
  .catch(console.error);
