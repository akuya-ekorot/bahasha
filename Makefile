create_migrations:
	pnpm drizzle-kit generate

push_migrations:
	pnpm supabase db push
