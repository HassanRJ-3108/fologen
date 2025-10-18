-- Expanded user schema to match comprehensive planning document
-- Create profiles table with comprehensive user data
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  first_name text,
  last_name text,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  website text,
  phone text,
  company text,
  job_title text,
  industry text,
  preferences jsonb default '{"tone": "professional", "style": "modern", "language": "en"}',
  auth_provider text default 'email', -- 'email', 'google', 'github'
  auth_provider_id text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create subscriptions table
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan varchar(50) not null default 'free', -- 'free', 'starter', 'premium'
  provider varchar(50) not null default 'lemon_squeezy',
  provider_subscription_id varchar(255) unique,
  status varchar(50) not null default 'active', -- 'active', 'cancelled', 'past_due'
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  next_billing_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create portfolios table
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name varchar(255) not null,
  slug varchar(255) unique not null,
  theme_id uuid,
  content jsonb default '{}',
  published_at timestamp with time zone,
  custom_domain varchar(255) unique,
  domain_verified boolean default false,
  version int default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, slug)
);

-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  title varchar(255) not null,
  description text,
  images text[] default '{}',
  tags text[] default '{}',
  metadata jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create templates table
create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  name varchar(255) not null,
  description text,
  schema_json jsonb not null,
  assets jsonb default '{}',
  is_public boolean default false,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create ai_memory table for user preferences
create table if not exists public.ai_memory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  key varchar(255) not null,
  value text not null,
  last_updated timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, key)
);

-- Create audit_logs table
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entity_type varchar(50) not null,
  entity_id uuid not null,
  action varchar(50) not null,
  changes jsonb default '{}',
  agent_used varchar(100),
  timestamp timestamp with time zone default timezone('utc'::text, now())
);

-- Create usage_quotas table
create table if not exists public.usage_quotas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  month date not null,
  ai_calls_used int default 0,
  ai_calls_limit int default 10,
  images_generated int default 0,
  images_limit int default 5,
  storage_used_mb int default 0,
  storage_limit_mb int default 100,
  unique(user_id, month)
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.portfolios enable row level security;
alter table public.projects enable row level security;
alter table public.templates enable row level security;
alter table public.ai_memory enable row level security;
alter table public.audit_logs enable row level security;
alter table public.usage_quotas enable row level security;

-- RLS Policies for profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- RLS Policies for subscriptions
create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "subscriptions_insert_own"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "subscriptions_update_own"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- RLS Policies for portfolios
create policy "portfolios_select_own"
  on public.portfolios for select
  using (auth.uid() = user_id);

create policy "portfolios_insert_own"
  on public.portfolios for insert
  with check (auth.uid() = user_id);

create policy "portfolios_update_own"
  on public.portfolios for update
  using (auth.uid() = user_id);

create policy "portfolios_delete_own"
  on public.portfolios for delete
  using (auth.uid() = user_id);

-- RLS Policies for projects
create policy "projects_select_own"
  on public.projects for select
  using (
    exists (
      select 1 from public.portfolios
      where portfolios.id = projects.portfolio_id
      and portfolios.user_id = auth.uid()
    )
  );

create policy "projects_insert_own"
  on public.projects for insert
  with check (
    exists (
      select 1 from public.portfolios
      where portfolios.id = projects.portfolio_id
      and portfolios.user_id = auth.uid()
    )
  );

-- RLS Policies for ai_memory
create policy "ai_memory_select_own"
  on public.ai_memory for select
  using (auth.uid() = user_id);

create policy "ai_memory_insert_own"
  on public.ai_memory for insert
  with check (auth.uid() = user_id);

create policy "ai_memory_update_own"
  on public.ai_memory for update
  using (auth.uid() = user_id);

-- RLS Policies for audit_logs
create policy "audit_logs_select_own"
  on public.audit_logs for select
  using (auth.uid() = user_id);

-- RLS Policies for usage_quotas
create policy "usage_quotas_select_own"
  on public.usage_quotas for select
  using (auth.uid() = user_id);

-- Create indexes for performance
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_portfolios_user_id on public.portfolios(user_id);
create index if not exists idx_portfolios_slug on public.portfolios(slug);
create index if not exists idx_projects_portfolio_id on public.projects(portfolio_id);
create index if not exists idx_audit_logs_user_id on public.audit_logs(user_id);
create index if not exists idx_audit_logs_entity on public.audit_logs(entity_type, entity_id);
create index if not exists idx_usage_quotas_user_id on public.usage_quotas(user_id);

-- Create trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    full_name,
    avatar_url,
    auth_provider,
    auth_provider_id,
    is_verified
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null),
    coalesce(new.raw_user_meta_data ->> 'provider', 'email'),
    coalesce(new.raw_user_meta_data ->> 'provider_id', null),
    false
  )
  on conflict (id) do nothing;

  -- Create default free subscription
  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
