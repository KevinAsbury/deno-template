# Deno & Oak Server Template

## Purpose

Create a base template for Deno featuring:

- User endpoints
- Sessions
- Postgresql

## Install

- Clone repo
- Use `psql` or `PG Admin` to run the creation SQL
- Configure database
- Create public/private json web keys

```shell
psql -h localhost -U postgres -p 5432
postgres-# \i ~/repo/location/db/schema/core_development.sql
postgres-# \i ~/repo/location/db/tables/users.sql
postgres-# \q

cp config/db.config.development.json config/db.config.json
deno run --allow-write --allow-read keygen.ts
```

- Edit values in `db.config.json` to match your connection parameters

## Run

`deno run --allow-net application.ts`
