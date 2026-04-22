# Local Directus Setup

Local Docker Compose setup for running Directus CMS during development.

## Services

| Service      | Port | Description         |
| ------------ | ---- | ------------------- |
| Directus     | 8055 | Headless CMS        |
| PostgreSQL   | -    | Database (internal) |
| Redis        | -    | Cache (internal)    |
| RedisInsight | 5540 | Redis GUI           |
| Adminer      | 5050 | Database GUI        |

## Getting Started

```bash
cd local
docker-compose up
```

Directus will be available at http://localhost:8055

Default admin credentials:

- Email: `admin@example.com`
- Password: `d1r3ctu5`

## Configuration

All environment variables are in `.env`. Key settings:

| Variable         | Default                                       | Description          |
| ---------------- | --------------------------------------------- | -------------------- |
| `DIRECTUS_PORT`  | `8055`                                        | Directus port        |
| `ADMIN_EMAIL`    | `admin@example.com`                           | Admin login email    |
| `ADMIN_PASSWORD` | `d1r3ctu5`                                    | Admin login password |
| `CORS_ORIGIN`    | `http://localhost:3000,http://localhost:8055` | Allowed origins      |

## Data Persistence

- `data/database/` - PostgreSQL data
- `uploads/` - Directus file uploads
- `extensions/` - Directus extensions
