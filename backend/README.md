Node v20 + Express + TypeScript + MySQL + Prisma ORM

## Running

1. Copy env file `cp example.env .env`, [setup `.env` creds]?
2. Install dependencies `npm ci`
3. Run migrations `npx prisma migrate dev`
4. aa
5. Run Docker `docker compose up -d`


## DB updates

After any db schema update we need to run `npx prisma migrate dev`