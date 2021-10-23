jest.mock('../../src/weather/weather.repository');
jest.mock('../../src/shared/services/http.service');
import { WeatherService } from '../../src/weather/weather.service';

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeAll(() => {
    weatherService = new WeatherService();
  });

  it('#isValidHour should return if a hour is valid', () => {
    expect(weatherService.isValidHour(0)).toBeTruthy();
    expect(weatherService.isValidHour(2)).toBeTruthy();
    expect(weatherService.isValidHour(23)).toBeTruthy();
    expect(weatherService.isValidHour(-1)).toBeFalsy();
    expect(weatherService.isValidHour(5.2)).toBeFalsy();
    expect(weatherService.isValidHour(24)).toBeFalsy();
    expect(weatherService.isValidHour(null)).toBeFalsy();
    expect(weatherService.isValidHour(undefined)).toBeFalsy();
  });
});
