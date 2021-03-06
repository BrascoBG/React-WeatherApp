import React from "react";
import WeatherApp from "./components/WeatherApp";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      weatherData: [],
      loading: false,
      date: new Date(),
    };
  }

  handleEvent = (event) => {
    if (event.key === "Enter") {
      this.setState({ loading: true });
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=bceb5bceace2a4bcf05b785f1f7ab57b`
      )
        .then((res) => {
          if (!res.ok) {
            alert(`There is no city with that name! "${this.state.city}"`);
            throw res;
          }
          return res.json();
        })
        .then((data) => {
          this.setState({
            weatherData: data,
            loading: false,
            city: "",
          });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <WeatherApp
          weatherData={this.state.weatherData}
          handleEvent={this.handleEvent}
          setState={(e) => this.setState({ city: e.target.value })}
          loading={this.state.loading}
          date={this.state.date}
          city={this.state.city}
        />
      </React.Fragment>
    );
  }
}

export default App;
