# RBFA Calendar

[iCalendar](https://en.wikipedia.org/wiki/ICalendar) for soccer teams.

## Running the app

```bash
cargo watch -x run # serves static files from ./webapp/dist

webapp:
cd webapp
ng serve --open
ng build # copies output to ./webapp/dist (served by rust/rocket)
```


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

Push image to private registry and trigger redeployment:

```bash
docker login -u timvw registry.apps.timvw.be

docker tag rbfacalendar:latest registry.apps.timvw.be/rbfacalendar:latest
docker push registry.apps.timvw.be/rbfacalendar:latest

kubectl rollout restart deployment rbfacalendar -n rbfacalendar
```

Deploy on k8s cluster:

```bash
kubectl apply -f deploym.yml

kubectl create secret -n rbfacalendar docker-registry regcred \
  --docker-server=registry.apps.timvw.be \
  --docker-username=$REGISTRY_USER \
  --docker-password=$REGISTRY_PASS \
  --docker-email=$REGISTRY_MAIL


```


