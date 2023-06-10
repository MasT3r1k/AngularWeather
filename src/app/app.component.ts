import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';
import { weatherDesc, Cities, months, days, daysShort, weatherTypes } from './Weather';


interface Weather {
  day: number;
  maxTempDay: number;
  maxTempDayUnit: string;
  minTempDay: number;
  minTempDayUnit: string;
  weatherCodeDay: number;
}

interface WeatherHour {
  day: number;
  time: Time;
  precipitation: number;
  precipitationUnit: string;
  relativehumidity: number;
  relativehumidityUnit: string;
  temperature: number;
  temperatureUnit: string;
  windspeed: number;
  windspeedUnit: string;
  weathercode: number;
}

function addZero(num: number) {
  if (num < 10) return '0' + num;
  return num;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularWeather';

  declare search_cities: Array<Cities>;
  selected_city: Cities | null = null;
  declare weatherDays: Array<Weather>;
  declare weatherHours: Array<WeatherHour>;
  today: Date = new Date();

  now: Date = new Date();

  getDay(num: number) {
    return new Date(num).getDay();
  }

  days = days;
  daysShort = daysShort;
  months = months;
  weatherCodes = weatherDesc;

  selectNewCity: boolean = false;

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): void {
    let Time = new Date();
    this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,windspeed_10m_max&timeformat=unixtime&timezone=auto&start_date=${Time.getFullYear()}-${addZero(Time.getMonth() + 1)}-${addZero(Time.getDate())}&end_date=${Time.getFullYear()}-${addZero(Time.getMonth() + 1)}-${addZero(Time.getDate() + 3)}`).subscribe((data: any) => {
      this.weatherDays = [];
      this.weatherHours = [];
      for(let i = 0;i < data['daily']['time'].length;i++) {
        this.weatherDays.push({
          day: data['daily']['time'][i],
          maxTempDay: data['daily']['temperature_2m_max'][i],
          maxTempDayUnit: data['daily_units']['apparent_temperature_max'],
          minTempDay: data['daily']['temperature_2m_min'][i],
          minTempDayUnit:data['daily_units']['apparent_temperature_min'],
          weatherCodeDay: data['daily']['weathercode'][i]
        });
        for(let i2 = 0;i2 < 24;i2++) {
          this.weatherHours.push({
            day: i,
            time: data['hourly']['time'][i * 24 + i2],
            precipitation: data['hourly']['precipitation'][i * 24 + i2],
            precipitationUnit: data['hourly_units']['precipitation'],
            relativehumidity: data['hourly']['relativehumidity_2m'][i * 24 + i2],
            relativehumidityUnit: data['hourly_units']['relativehumidity_2m'],
            temperature: data['hourly']['temperature_2m'][i * 24 + i2],
            temperatureUnit: data['hourly_units']['temperature_2m'],
            windspeed: data['hourly']['windspeed_10m'][i * 24 + i2],
            windspeedUnit: data['hourly_units']['windspeed_10m'],
            weathercode: data['hourly']['weathercode'][i * 24 + i2]
          });
        }
      }

      this.today = new Date(this.weatherDays[0]['day'] * 1000);
    })
  }

  ngOnInit(): void {
    console.log(this.getDataFromWeatherCode(61))
    this.http.get("http://ip-api.com/json/?fields=country,countryCode,city,lat,lon,timezone,query").subscribe(
    {
      next: (data: any) => {
        this.selected_city = {name: data['city'], timezone: data['timezone'], latitude: data['lat'], longitude: data['lon'], country: data['country'], country_code: data['countryCode']};
        this.getWeather(this.selected_city['latitude'], this.selected_city['longitude']);
        this.selectNewCity = false;
      }, error: (error: string) => {
        this.selectNewCity = true;
        console.log("Něco blockuje zjištění ip adresy.");
      }
    });

    setInterval(() => {
      this.now = new Date();
    }, 60000)

  }

  searchCity(event: KeyboardEvent) {
    setTimeout(() => { // To show the original value
      let value = (<HTMLInputElement>event.target).value;
      this.http.get("https://geocoding-api.open-meteo.com/v1/search?name=" + value).subscribe((data: any) => {
        console.log(data.generationtime_ms)
        if (data.generationtime_ms > 100) return console.log("Zásilka s městy (" + value + ") trvala příliš dlouho. Nebyla zpracována.");
        if (data.results) {
          this.search_cities = [];
          for(let i = 0;i < data.results.length;i++) {
            this.search_cities.push({name: data.results[i]['name'], timezone: data.results[i]['timezone'], latitude: data.results[i]['latitude'], longitude: data.results[i]['longitude'], country: data.results[i]['country'], country_code: data.results[i]['country_code']})
          }
        }
      })
    }, 1)
  }

  getDataFromWeatherCode(weathercode: number | string) {
    let r = { text: '', icon: ''};
    Object.entries(this.weatherCodes).forEach(a => {
      if (a[0] == weathercode as string) {
        r = a[1];
      }
    })
    return r;
  }

  showCity(id: number) {
    this.selected_city = this.search_cities[id];
    this.getWeather(this.selected_city.latitude, this.selected_city.longitude);
    this.selectNewCity = false;
    this.search_cities = [];
  }

}
