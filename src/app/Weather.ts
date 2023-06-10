export type weatherTypes = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99;
export const weatherDesc: Object = {
  0: {text: "Clear sky", icon: 'sun-bright'},
  1: {text: "Mainly clear", icon: 'sun-cloud'},
  2: {text: "partly cloudy", icon: 'cloud-sun'},
  3: {text: "overcast", icon: 'clouds'},
  45: {text: "Fog", icon: 'cloud-fog'},
  48: {text: "depositing rime fog", icon: 'cloud-fog'},
  51: {text: "Drizzle (light)", icon: 'cloud-drizzle'},
  53: {text: "Drizzle (moderate)", icon: 'cloud-drizzle'},
  55: {text: "Drizzle (dense intensity)", icon: 'cloud-drizzle'},
  56: {text: "Freezing Drizzle (light)", icon: 'cloud-drizzle'},
  57: {text: "Freezing Drizzle (dense intensity)", icon: 'cloud-drizzle'},
  61: {text: "Rain (slight)", icon: 'cloud-rain'},
  63: {text: "Rain (moderate)", icon: 'cloud-rain'},
  65: {text: "Rain (heavy intensity)", icon: 'cloud-rain'},
  66: {text: "Freezing Rain (light)", icon: 'cloud-rain'},
  67: {text: "Freezing Rain (heavy intensity)", icon: 'cloud-rain'},
  71: {text: "Snow fall (slight)", icon: 'snowflake'},
  73: {text: "Snow fall (moderate)", icon: 'cloud-snow'},
  75: {text: "Snow fall (heavy intensity)", icon: 'cloud-snow'},
  77: {text: "Snow grains" , icon: 'cloud-snow'},
  80: {text: "Rain showers (slight)", icon: 'cloud-showers'},
  81: {text: "Rain showers (moderate)", icon: 'cloud-showers'},
  82: {text: "Rain showers (violent)", icon: 'cloud-showers-heavy'},
  85: {text: "Snow showers (slight)", icon: 'cloud-showers-heavy'},
  86: {text: "Snow showers (heavy)", icon: 'cloud-showers-heavy'},
  95: {text: "Thunderstorm: Slight or moderate", icon: 'cloud-bolt'},
  96: {text: "Thunderstorm with slight and heavy hail", icon: 'cloud-bolt'},
  99: {text: "Thunderstorm with slight and heavy hail", icon: 'cloud-bolt'},
  404: {text: "Unknown", icon: 'cloud-question'}
}

export const days: Array<String> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const daysShort: Array<String> = [];
days.forEach(_ => {
    daysShort.push(_.slice(0, 2));
})

export const months: Array<String> = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

export interface Cities {
    name: string;
    timezone: string;
    latitude: number;
    longitude: number;
    country: string;
    country_code: string;
}