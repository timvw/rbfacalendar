# RBFA Calendar

[iCalendar](https://en.wikipedia.org/wiki/ICalendar) for soccer teams.

## Development

All command invocations to run, test, release and deploy this app are encoded in the [Makefile](./Makefile)


## Extra for deployment

```bash
docker login -u timvw registry.apps.timvw.be

kubectl create secret -n rbfacalendar docker-registry regcred \
  --docker-server=registry.apps.timvw.be \
  --docker-username=$REGISTRY_USER \
  --docker-password=$REGISTRY_PASS \
  --docker-email=$REGISTRY_MAIL
```


