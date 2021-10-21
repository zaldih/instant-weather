import { HttpService } from 'src/shared/services/http.service';
import { NoDataException } from './exceptions/no-data.exception';

export class WeatherService {
  constructor(private http: HttpService = new HttpService()) {}

  getWeather(lat: number, lon: number): Promise<any> {
    console.log('API');
    const API_KEY = 'nulk';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${API_KEY}`;
    return this.http
      .get(url)
      .then(async (response: { data: string }) => {
        return response.data;
      })
      .catch((error: any) => {
        throw new NoDataException();
      });
  }

  getWetherFromCache(lat: number, lon: number): Promise<any> {
    console.log('CACHE');
    return null;
  }
}
