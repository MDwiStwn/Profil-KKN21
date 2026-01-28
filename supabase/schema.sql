-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ACTIVITIES TABLE
create table if not exists activities (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  event_date date not null default current_date,
  created_at timestamptz default now() not null
);

alter table activities enable row level security;

-- Activities Policies
create policy "Public activities are viewable by everyone"
  on activities for select
  using ( true );

-- Only authenticated users (Admins) can insert/update/delete
create policy "Admins can manage activities"
  on activities for all
  using ( auth.role() = 'authenticated' );


-- TESTIMONIALS TABLE
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  is_approved boolean default false,
  ip_address text,
  created_at timestamptz default now() not null
);

alter table testimonials enable row level security;

-- Testimonials Policies
create policy "Approved testimonials are viewable by everyone"
  on testimonials for select
  using ( is_approved = true );

create policy "Admins can view all testimonials"
  on testimonials for select
  using ( auth.role() = 'authenticated' );

create policy "Anyone can insert testimonials"
  on testimonials for insert
  with check ( true );

create policy "Admins can update testimonials"
  on testimonials for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete testimonials"
  on testimonials for delete
  using ( auth.role() = 'authenticated' );


-- RATE LIMITS TABLE (Used by Server Actions)
create table if not exists rate_limits (
  id uuid default gen_random_uuid() primary key,
  ip_address text not null,
  last_submission timestamptz default now(),
  created_at timestamptz default now()
);

alter table rate_limits enable row level security;
-- No public policies needed, server-side only.


-- STORAGE (If creating bucket via SQL is supported, else manual)
-- insert into storage.buckets (id, name, public) values ('activity-photos', 'activity-photos', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'activity-photos' );
-- create policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'activity-photos' and auth.role() = 'authenticated' );
