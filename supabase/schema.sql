-- CRM X — run in free Supabase SQL editor
-- Auth users are created in Authentication > Users, then linked in public.profiles

create type public.user_role as enum ('cpo', 'employee');
create type public.task_status as enum ('todo', 'in_progress', 'waiting', 'blocked', 'review', 'done');
create type public.priority as enum ('low', 'medium', 'high', 'critical');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role public.user_role not null default 'employee',
  zone text,
  title text,
  avatar text,
  permissions text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.zones (
  slug text primary key,
  name text not null,
  emoji text not null,
  color text not null,
  deadline date
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  zone text references public.zones(slug),
  assignee_id uuid references public.profiles(id),
  author_id uuid references public.profiles(id),
  participant_ids uuid[] not null default '{}',
  due date,
  priority public.priority not null default 'medium',
  status public.task_status not null default 'todo',
  weight int not null default 1,
  critical_path boolean not null default false,
  result text default '',
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  text text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.zones enable row level security;
alter table public.tasks enable row level security;
alter table public.comments enable row level security;

create or replace function public.is_cpo()
returns boolean language sql stable as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'cpo');
$$;

-- CPO sees all
create policy "cpo profiles" on public.profiles for all using (public.is_cpo()) with check (public.is_cpo());
create policy "self profile" on public.profiles for select using (id = auth.uid());

create policy "cpo zones" on public.zones for all using (public.is_cpo()) with check (public.is_cpo());
create policy "employee zone page" on public.zones for select using (
  public.is_cpo()
  or slug = (select zone from public.profiles where id = auth.uid())
     and 'zone_page' = any(select unnest(permissions) from public.profiles where id = auth.uid())
);

create policy "cpo tasks" on public.tasks for all using (public.is_cpo()) with check (public.is_cpo());
create policy "employee own tasks" on public.tasks for select using (
  assignee_id = auth.uid()
  or author_id = auth.uid()
  or auth.uid() = any(participant_ids)
  or (
    zone = (select zone from public.profiles where id = auth.uid())
    and 'zone_team_tasks' = any((select permissions from public.profiles where id = auth.uid()))
  )
);
create policy "employee insert task" on public.tasks for insert with check (
  author_id = auth.uid() and assignee_id = auth.uid()
);
create policy "employee update own" on public.tasks for update using (
  assignee_id = auth.uid() or author_id = auth.uid() or auth.uid() = any(participant_ids)
);

create policy "comments read" on public.comments for select using (
  public.is_cpo()
  or exists (
    select 1 from public.tasks t
    where t.id = task_id
      and (t.assignee_id = auth.uid() or t.author_id = auth.uid() or auth.uid() = any(t.participant_ids))
  )
);
create policy "comments write" on public.comments for insert with check (user_id = auth.uid());
