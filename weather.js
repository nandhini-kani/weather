const submitbutton = document.getElementById("isubmitbt");
const input = document.getElementById("inputbox");
const picture = document.getElementById("cloudy")
const picture2=document.getElementById("cloudy2").trim;


submitbutton.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apikey = "4318c906fc0a9d1ff5b55ef19b508021";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appID=${apikey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();

    // --- COPY old box 1 data to box 2 (before overwriting box 1) ---
    document.getElementById("cityname2").innerText = document.getElementById("cityname").innerText;
    document.getElementById("temp2").innerText = document.getElementById("temp").innerText;
    document.getElementById("climate2").innerText = document.getElementById("climate").innerText;
    document.getElementById("cloudy2").src = document.getElementById("cloudy").src;
    document.getElementById("cloudy2").classList.remove("hidden");

    // --- UPDATE box 1 with NEW weather ---
    document.getElementById("cityname").innerText = data.name;
    document.getElementById("temp").innerText = `${data.main.temp}°C`;
    document.getElementById("climate").innerText = data.weather[0].description;
  
    picture.classList.remove("hidden");

    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain.includes("cloud")) {
      picture.src = "partly sunny.png";
    } else if (weatherMain === "clear") {
      picture.src = "sunny.svg";
    } else if (weatherMain === "rain") {
      picture.src = "cloudy.jpg";
    } else if (weatherMain === "drizzle") {
      picture.src = "thunderstorm.webp";
    } else if (weatherMain === "mist") {
      picture.src = "foggy.jpg";
    } else {
      picture.src = "snow.jpeg";
    }

    picture.classList.remove("hidden");

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch weather data");
  }
});
