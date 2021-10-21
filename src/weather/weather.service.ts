import { HttpService } from 'src/shared/services/http.service';

export class WeatherService {
  constructor(private http: HttpService = new HttpService()) {}

  getWeather(lat: number, lon: number): Promise<any> {
    console.log('API');
    const API_KEY = 'nulk';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${API_KEY}`;
    return this.http.get(url);
  }

  getWetherFromCache(lat: number, lon: number): Promise<any> {
    console.log('CACHE');
    return null;
  }
}
