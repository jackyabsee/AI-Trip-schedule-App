# AI Trip Backend

Minimal Express + TypeScript backend for AI Trip Schedule App.

Setup

1. Copy `.env.example` to `.env` and set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
2. Install dependencies: `npm install`.
3. Run in dev: `npm run dev`.

Endpoints

- `POST /api/schedule/generate` — generate a schedule. If `Authorization: Bearer <access_token>` is provided and valid, schedule will be saved to `schedules` table.
- `PATCH /api/users/membership` — update membership (requires valid Bearer token).
- `GET /api/form/options` — return form options.

Run the SQL in `src/scripts/init_db.sql` in your Supabase project to create required tables.
