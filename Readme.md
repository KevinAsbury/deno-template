# Deno & Oak Server Template

## Purpose

Create a base template for Deno featuring:

- User endpoints
- Sessions
- Postgresql

## Install

- Clone repo
- Use `psql` or `PG Admin` to run the creation SQL
- Configure database:

```shell
cd src/config
cp db.config.development.json db.config.json
```

- Edit values in `db.config.json` to match your connection parameters

## Run

`deno run --allow-net src/application.ts`
