const searchBox = document.querySelector(".card__input");
const searchBtn = document.getElementById("searchBtn");
const temp = document.querySelector(".card__title--temp");
const cityElement = document.querySelector(".card__title--city");
const humidity = document.getElementById("humidity");
const icon = document.querySelector(".card__weather-icon");
const wind = document.getElementById("wind");
const date = document.getElementById("date");

const showDate = () => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleDateString("en", { month: "long" });
    date.textContent = `${day} ${monthName}`;
};

function getWeatherIconClass(code) {
    if (code === 0) {
        return "fa-solid fa-sun card__weather-icon";
    }
    if (code === 1 || code === 2) {
        return "fa-solid fa-cloud-sun card__weather-icon";
    }
    if (code === 3) {
        return "fa-solid fa-cloud card__weather-icon";
    }
    if (code === 45 || code === 48) {
        return "fa-solid fa-smog card__weather-icon";
    }
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return "fa-solid fa-cloud-rain card__weather-icon";
    }
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return "fa-solid fa-snowflake card__weather-icon";
    }
    if (code >= 95 && code <= 99) {
        return "fa-solid fa-cloud-bolt card__weather-icon";
    }
    return "fa-solid fa-cloud card__weather-icon";
}

async function getWeather(city) {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmedCity)}&count=1`
        );
        if (!geoResponse.ok) {
            throw new Error("Ошибка при поиске города");
        }

        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            alert("City not found");
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=ms`
        );
        if (!weatherResponse.ok) {
            throw new Error("City not found ");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        cityElement.textContent = name;
        temp.textContent = `${Math.round(current.temperature_2m)}°C`;
        wind.textContent = `${current.wind_speed_10m} m/s`;
        humidity.textContent = `${current.relative_humidity_2m}%`;
        icon.className = getWeatherIconClass(current.weather_code);
    } catch (error) {
        console.error("Сбой загрузки погоды:", error);
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather(searchBox.value);
    }
});

showDate();
getWeather("New York");