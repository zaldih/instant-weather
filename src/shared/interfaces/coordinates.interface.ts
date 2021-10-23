export interface GeoJson {
  type: 'Point';
  coordinates: Coordinates;
}

export interface Coordinates extends Array<number | number> {
  0: number;
  1: number;
}
