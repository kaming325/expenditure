import { Hono } from 'hono';
import { supabase } from './supabase';

const auth = new Hono();

auth.post(async (ctx) => {
	// const supabase = ctx.get('supabase');

	const { email, password, phone, refresh_token } = await ctx.req.json();

	if (refresh_token) {
		const { data, error } = await supabase.auth.refreshSession({
			refresh_token,
		});
		return ctx.json({ data, error });
	}

	if (!email && !phone) throw new Error('email or phone is required');
	const { data, error } = await supabase.auth.signInWithPassword({
		...(email ? { email } : {}),
		...(phone ? { phone } : {}),
		password,
	} as any);
	return ctx.json({ data, error });
});

export default auth;
