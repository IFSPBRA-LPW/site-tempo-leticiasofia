import { cityWeather } from "./data.js";


function renderBannerInfo(data) {
  const title = document.querySelector(".today-weather h2");
  const date = document.querySelector(".today-weather p");

  title.textContent = `${data.city}, ${data.country}`;
  date.textContent = data.date;

  document.getElementById("temperatura-principal").innerHTML =
    `<b><i>${data.temperature}°</i></b>`;
}

function renderDayInfo(data) {
  const stats = document.querySelectorAll(".stats h3");

  stats[0].textContent = `${data.feelsLike}°`;
  stats[1].textContent = `${data.humidity}%`;
  stats[2].textContent = `${data.wind} km/h`;
  stats[3].textContent = `${data.precipitation} mm`;
}


function renderDaily(dailyData) {
  const container = document.querySelector(".daily");


  container.querySelectorAll("section").forEach(sec => sec.remove());

  dailyData.forEach(day => {
    const section = document.createElement("section");

    section.innerHTML = `
      <p>${day.day}</p>
      <p>${day.max}°&nbsp;&nbsp;&nbsp;&nbsp;${day.min}</p>
    `;

    container.appendChild(section);
  });
}


function renderHourly(hourlyData) {
  const container = document.querySelector(".hourly");


  container.querySelectorAll("li").forEach(li => li.remove());

  hourlyData.forEach(hour => {
    const li = document.createElement("li");
    li.classList.add("forecast-item");

    li.innerHTML = `${hour.time}&nbsp;&nbsp;&nbsp;&nbsp;${hour.temp}`;

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