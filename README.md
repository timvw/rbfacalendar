# RBFA Calendar

[iCalendar](https://en.wikipedia.org/wiki/ICalendar) for soccer teams.

## Building

Uses standard rust toolchain:

```bash
cargo build --release
```

Uses standard docker toolchain:

```bash
docker build . -t rbfacalendar:latest
docker run --rm -it -p 8000:8000 rbfacalendar:latest
```
