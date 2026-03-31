import { cityWeather } from "./data.js";

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
      <p>${day.day} ${day.icon}</p>
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

function orchestrator() {
  renderBannerInfo(cityWeather);
  renderDayInfo(cityWeather);
  renderDaily(cityWeather.daily);
  renderHourly(cityWeather.hourly);
}

console.log("Dados importados:", cityWeather);

orchestrator();