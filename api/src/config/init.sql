CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ 
BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION 
  WHEN duplicate_object THEN RAISE NOTICE 'Тип user_role уже существует.';
END $$;

DO $$ 
BEGIN
  CREATE TYPE point_status AS ENUM ('new', 'in_progress', 'completed');
EXCEPTION 
  WHEN duplicate_object THEN RAISE NOTICE 'Тип point_status уже существует.';
END $$;

DO $$ 
BEGIN
  CREATE TYPE point_type AS ENUM ('point', 'achievement');
EXCEPTION 
  WHEN duplicate_object THEN RAISE NOTICE 'Тип point_type уже существует.';
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

CREATE TABLE IF NOT EXISTS points (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type          point_type NOT NULL DEFAULT 'point',
  description       TEXT NOT NULL,
  deadline      DATE NOT NULL,
  status        point_status NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);