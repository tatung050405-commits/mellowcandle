-- =====================================================================
-- Mellow Candle · schema cho Supabase
-- Cách dùng: Supabase → SQL Editor → New query → dán toàn bộ → Run
-- =====================================================================
create extension if not exists pgcrypto with schema extensions;

-- 1) Bảng thông điệp ---------------------------------------------------
create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references auth.users(id) on delete cascade,
  slug            text not null unique,
  title           text,
  sender_name     text,
  receiver_name   text,
  message_content text,
  media_type      text check (media_type in ('video','audio')),
  media_url       text,
  cover_url       text,
  privacy         text not null default 'public' check (privacy in ('public','private')),
  password_hash   text,
  expiration_date timestamptz,
  template_id     text,
  created_at      timestamptz not null default now()
);
create index if not exists messages_user_idx on public.messages (user_id, created_at desc);

alter table public.messages enable row level security;
drop policy if exists "owner select" on public.messages;
drop policy if exists "owner insert" on public.messages;
drop policy if exists "owner update" on public.messages;
drop policy if exists "owner delete" on public.messages;
create policy "owner select" on public.messages for select to authenticated using (user_id = auth.uid());
create policy "owner insert" on public.messages for insert to authenticated with check (user_id = auth.uid());
create policy "owner update" on public.messages for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "owner delete" on public.messages for delete to authenticated using (user_id = auth.uid());

-- 2) Mã hóa mật khẩu thông điệp (app gửi mật khẩu thường, DB tự băm) ----
create or replace function public.messages_hash_pw() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
begin
  if new.password_hash = '' then
    new.password_hash := null;
  elsif new.password_hash is not null and (tg_op = 'INSERT' or new.password_hash is distinct from old.password_hash) then
    new.password_hash := crypt(new.password_hash, gen_salt('bf'));
  end if;
  return new;
end $$;
drop trigger if exists messages_hash_pw on public.messages;
create trigger messages_hash_pw before insert or update on public.messages
  for each row execute function public.messages_hash_pw();

-- 3) Người nhận (không cần đăng nhập) mở thông điệp qua mã QR ----------
create or replace function public.get_message(p_slug text, p_password text default null)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare m public.messages;
begin
  select * into m from public.messages where slug = p_slug;
  if not found then raise exception 'not_found'; end if;
  if m.expiration_date is not null and m.expiration_date < now() then raise exception 'expired'; end if;
  if m.privacy = 'private' and m.password_hash is not null then
    if p_password is null or p_password = '' then raise exception 'password_required'; end if;
    if crypt(p_password, m.password_hash) <> m.password_hash then raise exception 'wrong_password'; end if;
  end if;
  return jsonb_build_object(
    'title', m.title, 'sender_name', m.sender_name, 'receiver_name', m.receiver_name,
    'message_content', m.message_content, 'template_id', m.template_id, 'created_at', m.created_at,
    'media_type', m.media_type, 'media_url', m.media_url, 'cover_url', m.cover_url);
end $$;
revoke all on function public.get_message(text, text) from public;
grant execute on function public.get_message(text, text) to anon, authenticated;

-- 4) Kho video / ghi âm (bucket riêng tư, tối đa 50 MB mỗi file) --------
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', false, 52428800)
on conflict (id) do update set file_size_limit = excluded.file_size_limit;

create or replace function public.media_linked(p text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.messages m where m.media_url = p or m.cover_url = p)
$$;
grant execute on function public.media_linked(text) to anon, authenticated;

drop policy if exists "media upload own" on storage.objects;
drop policy if exists "media delete own" on storage.objects;
drop policy if exists "media select own" on storage.objects;
drop policy if exists "media read linked" on storage.objects;
create policy "media upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media select own" on storage.objects for select to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
-- người nhận chỉ đọc được file thuộc một thông điệp đã tạo
create policy "media read linked" on storage.objects for select to anon, authenticated
  using (bucket_id = 'media' and public.media_linked(name));
