const ApiKey = "Api-Key";
const card = document.querySelector(".card");
const searchBox = document.querySelector(".card__input");
const searchBtn = document.getElementById("searchBtn");
const temp= document.querySelector(".card__title--temp")
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const icon= document.getElementById("wind");
const wind = document.getElementById(".card__weather-icon");
const date= document.getElementById("date");


const showDate = () => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleDateString('en', {month:'long'})
    date.innerHTML =  `${day} ${monthName}`;

}

async function getWeather(params) {
    
}


showDate();