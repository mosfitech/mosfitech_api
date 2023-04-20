# Mosfitech API

[![Maintainability](https://api.codeclimate.com/v1/badges/2ac767745186038373f5/maintainability)](https://codeclimate.com/github/mosfitech/mosfitech_api/maintainability)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

## [Documentation](https://github.com/mosfitech)

## Installing Locally

To get the whole environment up locally (without Docker), you need to install and configure multiple technologies like:

- Mongodb
- Mosquito Mqtt
- Redis
- Nodejs

It is complex, that is why we recommend using Docker.

### Docker quickstart

1. Copy the environment file, and edit variables, domain name, etc

   `cp env.example .env`

2. Start basic services (recommended)

   In a new terminal window do:

   `docker-compose up app db`

   See the `docker-compose.yml` file `depends_on:` section to see which containers depend on which.

   Available containers:

   - `mongo` - mongodb
   - `redis`
   - `web` container which tries to get a certificate with Lets Encrypt.
   - `mqtt` EMQ + management interface on http://localhost:18083 _admin:public_
   - `mqtt-task` a rake task which subscribes to the `mqtt` service
   - `sidekiq`
   - `kairos` - Time series database on Cassandra
   - `cassandra-1` - Stores the data

   Start ALL of them (not recommended) with:

   `docker-compose up`

## Deploying

### Using Docker

1. SSH into the server
1. `git pull`
1. `docker-compose build`
1. `docker-compose up -d`

## Versioning

Currently using this tool to manually handle versioning: https://github.com/gregorym/bump

Use this command to update the VERSION file + create a git tag

`bump patch --tag`

Then push the git tag with:

`git push --tags`

## Credits 🎉

Part Of Mosfitech

## License

This project is licensed under MIT.
