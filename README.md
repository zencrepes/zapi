<h1 align="center"> ZenCrepes ZAPI </h1><br>

<p align="center">
This repository contains ZenCrepes GraphQL API.
</p>

# Documentation

You can find ZenCrepes documentation on [docs.zencrepes.io](https://docs.zencrepes.io/), issues should be created [here](https://github.com/zencrepes/zencrepes/issues)

This readme only contains developer-focused details.

# Start Developing

ZAPI is a [Nest.js](http://nestjs.com/) app, it is aimed at being used with ZUI.

## Launch the app

```bash
yarn
# Without Keycloak
KEYCLOAK_DISABLED=true yarn run start:dev
# With Keycloak
KEYCLOAK_DISABLED=false KEYCLOAK_ROLE=zencrepes-data yarn run start:dev
```

Note: zqueue needs to be able to reach an Elasticsearch instance

# Reach-out

Feel free to reach out on [slack](http://slack.overture.bio/), ZenCrepes has a dedicated channel on `#app_zencrepes`.

Overture gracefully provides the VM instance hosting dev & prod and the slack channel. ZenCrepes is not an Overture project.
