# Deployment information

Copy container images from docker hub to private registry:

```bash
skopeo copy docker://docker.io/timvw/rbfacalendar:main docker://registry.apps.timvw.be/rbfacalendar:latest --dest-username $REGISTRY_USER --dest-password $REGISTRY_PASS
```

Trigger rollout:

```bash
kubectl rollout restart -n rbfacalendar deployment/rbfacalendar
```
