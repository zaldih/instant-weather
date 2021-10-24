# Instant weather

---

## Features

- Get the weather information for a location.
  - Get the information for a specific hour
- Caches the results on a radio.

## Deploy

```bash
cp .env.example .env
# Edit .env with your own values.
docker-compose up
```

## Endpoints

| url              | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| /:lat/:lon       | Returns the weather information of the location by hours and by days  |
| /:lat/:lon/:hour | Returns the weather information of the location at the specified time |

## Test

Simply run:

```bash
npm run test
```
