-- Run these statements in Supabase SQL editor to create minimal tables used by the app

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key,
  email text,
  membership_tier text,
  membership_updated_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  destination text,
  start_date date,
  end_date date,
  duration int,
  payload jsonb,
  created_at timestamptz default now()
);

create table if not exists preset_schedules (
  id uuid primary key default gen_random_uuid(),
  name text,
  description text,
  payload jsonb,
  created_at timestamptz default now()
);

create table if not exists hotels (
  id uuid primary key default gen_random_uuid(),
  name text,
  address text,
  type text,
  price_per_night numeric,
  booking_url text,
  payload jsonb,
  created_at timestamptz default now()
);

-- Minimal forum posts and travel news tables
create table if not exists forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text,
  body text,
  payload jsonb,
  created_at timestamptz default now()
);

create table if not exists travel_news (
  id uuid primary key default gen_random_uuid(),
  title text,
  body text,
  payload jsonb,
  created_at timestamptz default now()
);
