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

Push image to private registry:

```bash
docker tag rbfacalendar:latest registry.apps.timvw.be/rbfacalendar:latest
docker login -u timvw registry.apps.timvw.be
git push registry.apps.timvw.be/rbfacalendar:latest
```
