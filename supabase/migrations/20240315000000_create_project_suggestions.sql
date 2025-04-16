create table project_suggestions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  app_name text not null,
  app_description text not null,
  suggestions text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table project_suggestions enable row level security;

-- Create policies
create policy "Users can view their own project suggestions"
  on project_suggestions for select
  using (auth.uid() = (select user_id from projects where id = project_id));

create policy "Users can insert their own project suggestions"
  on project_suggestions for insert
  with check (auth.uid() = (select user_id from projects where id = project_id));

create policy "Users can update their own project suggestions"
  on project_suggestions for update
  using (auth.uid() = (select user_id from projects where id = project_id));

-- Create updated_at trigger
create trigger set_updated_at
  before update on project_suggestions
  for each row
  execute procedure moddatetime (updated_at); 