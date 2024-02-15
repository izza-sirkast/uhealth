let weather = {
    "apikey": "7f27214484dc61d89cc71da5d61378ec",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=7f27214484dc61d89cc71da5d61378ec"
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Cuaca di " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humid").innerText =
            "Kelembapan: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Kecepatan Angin: " + speed + " km/jam";
        document.querySelector(".weather").classList.remove("loading");

        if (temp < 0) {
        document.querySelector("#temp_recomendation").innerText = "Suhu sangat dingin.";
        document.querySelector("#temp_recomendation2").innerText = "Pastikan untuk mengenakan pakaian hangat, minum minuman hangat, dan tetap di dalam ruangan jika memungkinkan.";
    } else if (temp >= 0 && temp <= 10) {
        document.querySelector("#temp_recomendation").innerText = "Suhu cukup dingin.";
        document.querySelector("#temp_recomendation2").innerText = "Kenakan pakaian yang cukup hangat dan jaga tubuh Anda tetap hangat.";
    } else if (temp > 10 && temp <= 20) {
        document.querySelector("#temp_recomendation").innerText = "Suhu cukup sejuk.";
        document.querySelector("#temp_recomendation2").innerText = "Kenakan pakaian yang nyaman dan pastikan untuk tetap terhidrasi.";
    } else if (temp > 20 && temp <= 26) {
        document.querySelector("#temp_recomendation").innerText = "Suhu cukup hangat.";
        document.querySelector("#temp_recomendation2").innerText = "Pastikan untuk memakai pakaian yang nyaman dan minum banyak air.";
    } else if (temp > 26 && temp <= 30) {
        document.querySelector("#temp_recomendation").innerText = "Suhu cukup tinggi.";
        document.querySelector("#temp_recomendation2").innerText = "Hindari aktivitas di luar ruangan pada siang hari, gunakan tabir surya, dan perbanyak minum.";
    } else if (temp > 30) {
        document.querySelector("#temp_recomendation").innerText = "Suhu sangat tinggi.";
        document.querySelector("#temp_recomendation2").innerText = "Hindari paparan sinar matahari langsung, minum banyak air, dan tetap di dalam ruangan dengan AC jika memungkinkan.";
    }
    
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

const newName = document.getElementById("cityInput");

function GetInfo() {
    const newName = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--";

    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        newName.value +
        "&appid=7f27214484dc61d89cc71da5d61378ec"
    ).then((response) => response.json()).then((data) => {
        //counter untuk max dan min value
        for (i = 0; i < 3; i++) {
            document.getElementById("day" + (i + 1) + "Min").innerHTML =
                "Min: " +
                Number(data.list[i].main.temp_min - 273.15).toFixed(1) +
                "°C";
        }

        for (i = 0; i < 3; i++) {
            document.getElementById("day" + (i + 1) + "Max").innerHTML =
                "Max: " +
                Number(data.list[i].main.temp_max - 273.15).toFixed(2) +
                "°C";
        }

        //icon untuk cuaca
        for (i = 0; i < 3; i++) {
            document.getElementById("img" + (i + 1)).src =
                "http://openweathermap.org/img/wn/" +
                data.list[i].weather[0].icon +
                ".png";
        }
        console.log(data);
        }).catch((err) => alert("Terjadi Kesalahan, Nama Kota yang dimasukkan salah"));}

function DefaultScreen() {
    const defaultCity = "Bandung";
    document.getElementById("cityInput").defaultValue = "Bandung";
    GetInfo(defaultCity);
}

// Menampilkan hari
const d = new Date();
const weekday = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (i = 0; i < 3; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i + 1)];
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        GetInfo(newName);
    }
});

weather.fetchWeather("Bandung");
DefaultScreen();