CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ 
BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION 
  WHEN duplicate_object THEN RAISE NOTICE 'Тип user_role уже существует.';
END $$;

DO $$ 
BEGIN
  CREATE TYPE request_status AS ENUM ('new', 'assigned', 'completed');
EXCEPTION 
  WHEN duplicate_object THEN RAISE NOTICE 'Тип request_status уже существует.';
END $$;

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  login         TEXT NOT NULL UNIQUE,
  password      TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  role          user_role NOT NULL DEFAULT 'user',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

    -- room: "auditorium", 
    -- start_time: "2026-02-24T21:00:00.000Z", 
    -- payment_method: "transfer"
CREATE TABLE IF NOT EXISTS requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room            TEXT NOT NULL,
  start_time      TEXT NOT NULL,
  payment_method  TEXT NOT NULL,
  type            TEXT NOT NULL,
  comment         TEXT,
  -- content         JSONB NOT NULL DEFAULT '{}'::jsonb,
  status          request_status NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_requests_user_id ON requests(user_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_content ON requests USING GIN(content);

CREATE TABLE IF NOT EXISTS feedback (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id  UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(request_id, user_id)
);