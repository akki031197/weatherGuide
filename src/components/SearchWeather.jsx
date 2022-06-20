import React, { useState, useEffect } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("Purnia");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${add_your_own_api_key}`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);
  let emoji = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "<fa-snow-flake></fa-snow-flake>";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);
  let feels_like = (data.main.feels_like - 273.15).toFixed(2);

  //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleDateString("default", { month: "long" });
  let day = d.toLocaleDateString("default", { weekday: "long" });

  //Time

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const handleChange = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card  text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                alt="..."
                className="card-img"
              />
              <div className="card-img-overlay">
                <form onSubmit={handleChange}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control shadow-none"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="sumt"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">
                    {day},{date} {month},{year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder ">{temp}&deg;c</h1>
                  <p className="fw-bolder ">Feels Like:{feels_like}&deg;c</p>
                  <p className="fw-bolder ">Wind Speed:{data.wind.speed}</p>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg;c | {temp_max}&deg;c
                  </p>
                  <p className="fw-bolder">Humidity:{data.main.humidity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
